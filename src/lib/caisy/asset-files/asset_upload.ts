import * as tus from "tus-js-client";
import { Upload as TusUpload } from "tus-js-client";
import fs from "fs";
import path from "path";
import mime from "mime-types";
import { createCanvas, loadImage, CanvasRenderingContext2D } from "canvas";
import { encode } from "blurhash";
export interface IUpload extends TusUpload {
  url: string;
}

export interface IUploadResult {
  url: string;
  documentId: string;
}

export interface IHandleFile {
  file: File | Blob | Pick<ReadableStreamDefaultReader, "read">;
  token: string;
  projectId: string;
  meta?: any;
  endpoint?: string;
  mode: string;
}

export interface IUploadFile {
  file: any;
  token: string;
  projectId: string;
  meta?: any; // meta info that will be filled in the asset fields
  endpoint?: string; // optional for other than cloud.caisy.io
}

export const uploadFile = async ({ file, token, projectId, meta, endpoint }: IUploadFile): Promise<IUploadResult> => {
  const headers = {
    "x-caisy-token": token,
    "x-caisy-upload-mode": "document",
    "x-caisy-project-id": projectId,
  };

  return new Promise((resolve, reject) => {
    const upload = new tus.Upload(file, {
      headers,
      endpoint: endpoint + "/upload/",
      onError: function (error) {
        reject(error);
      },
      metadata: {
        filename: meta.filename,
        filetype: meta.filetype,
        ...meta,
      },
      parallelUploads: 1,
      chunkSize: 512 * 1024, // 0.5MB
      onSuccess: function () {
        const assetUrl = upload.url?.replace("//cloud.", "//assets.").replace("/upload/", "/assets/");
        const parts = assetUrl ? `${assetUrl}`.split("assets/")[1]?.split("/") : null;
        const documentId = parts?.[1] || "";

        resolve({ url: assetUrl || "", documentId });
      },
    }) as IUpload;

    upload.start();
  }) as Promise<IUploadResult>;
};

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

export const importAssets = async ({
  folderPath,
  token,
  projectId,
  endpoint,
}: {
  folderPath: string;
  token: string;
  projectId: string;
  endpoint?: string;
}) => {
  const absoluteFolderPath = path.resolve(__dirname, "..", folderPath);
  console.log("Scanning directory:", absoluteFolderPath);
  const idMap = new Map();

  try {
    const files = getAllFiles(absoluteFolderPath);
    console.log(`Found ${files.length} files to upload.`);
    const maxConcurrency = 10;
    const uploadPromises = [];

    for (let i = 0; i < files.length; i += maxConcurrency) {
      const batch = files.slice(i, i + maxConcurrency);

      const batchPromises = batch.map(async filePath => {
        const fileBuffer = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);
        const fileType = mime.lookup(filePath) || "application/octet-stream";

        const oldId = path.basename(path.dirname(filePath)); // Assuming the old ID is the folder name

        // Extract image metadata
        const imageMetadata = await extractImageMetadata(fileBuffer);

        const { documentId } = await uploadFile({
          file: fileBuffer,
          token,
          projectId,
          endpoint,
          meta: {
            filename: fileName,
            filetype: fileType,
            ...imageMetadata,
          },
        });

        idMap.set(oldId, documentId);
        console.log(`Uploaded ${fileName} with ID: ${documentId}`);
        return { oldId, documentId };
      });

      await Promise.all(batchPromises);
    }
    return idMap;
  } catch (error) {
    console.error("Error importing assets:", error);
    throw error;
  }
};

export interface IImageMetadata {
  dominantColor: string;
  width: number;
  height: number;
  blurHash: string;
}

// Helper function to process file and extract image metadata
export async function extractImageMetadata(
  file: Buffer,
  resizeWidth: number = 800,
  step: number = 0.5,
): Promise<IImageMetadata> {
  return new Promise((resolve, reject) => {
    try {
      const processImage = async (buffer: Buffer) => {
        try {
          const img = await loadImage(buffer);
          steppedScale(img, resizeWidth, step, (data, color, blurHash) => {
            resolve({
              dominantColor: color,
              width: img.width,
              height: img.height,
              blurHash,
            });
          });
        } catch (error) {
          reject(new Error(`Failed to process image: ${error instanceof Error ? error.message : String(error)}`));
        }
      };

      processImage(file);
    } catch (error) {
      reject(error);
    }
  });
}

// Original functions for internal use
async function steppedResize(
  imagePath: string,
  width: number,
  step: number,
  cb: (data: Buffer, meta: IImageMetadata) => any,
) {
  try {
    const img = await loadImage(imagePath);
    steppedScale(img, width, step, (data, color, blurHash) => {
      cb(data, {
        dominantColor: color,
        width: img.width,
        height: img.height,
        blurHash,
      });
    });
  } catch (error) {
    throw new Error(`Failed to load image: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export function steppedScale(
  img: any,
  width: number,
  step: number,
  cb: (data: Buffer, color: string, blurHash: string) => any,
) {
  const canvas = createCanvas(width, 0);
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const oc = createCanvas(0, 0);
  const octx = oc.getContext("2d") as CanvasRenderingContext2D;

  // Set canvas dimensions
  canvas.width = width;
  canvas.height = (canvas.width * img.height) / img.width;

  if (img.width * step > width) {
    // For performance avoid unnecessary drawing
    const mul = 1 / step;
    let cur = {
      width: Math.floor(img.width * step),
      height: Math.floor(img.height * step),
    };

    oc.width = cur.width;
    oc.height = cur.height;

    octx.drawImage(img, 0, 0, cur.width, cur.height);

    while (cur.width * step > width) {
      cur = {
        width: Math.floor(cur.width * step),
        height: Math.floor(cur.height * step),
      };
      octx.drawImage(oc, 0, 0, cur.width * mul, cur.height * mul, 0, 0, cur.width, cur.height);
    }

    ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
  } else {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }

  let blurHash = "";
  try {
    let count = 0;
    let i = 0;
    const rgb = {
      r: 0,
      g: 0,
      b: 0,
    };

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.time("blurhash");
    blurHash = encode(imageData.data, imageData.width, imageData.height, 4, 4);
    console.timeEnd("blurhash");

    const length = imageData.data.length;

    while ((i += 5 * 4) < length) {
      count++;
      rgb.r += imageData.data[i] || 0;
      rgb.g += imageData.data[i + 1] || 0;
      rgb.b += imageData.data[i + 2] || 0;
    }

    // Floor values
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    // Convert canvas to buffer instead of dataURL
    const buffer = canvas.toBuffer("image/png");
    cb(buffer, rgbToHex(rgb), blurHash);
  } catch (e) {
    const buffer = canvas.toBuffer("image/png");
    cb(buffer, "", blurHash);
  }
}

// Utility functions
export function bufferToFile(buffer: Buffer, filename: string, mimeType: string = "image/png") {
  // In Node.js, you typically work with Buffer directly
  return {
    buffer,
    filename,
    mimeType,
    size: buffer.length,
  };
}

function componentToHex(c: number): string {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex({ r, g, b }: { r: number; g: number; b: number }): string {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
