import * as tus from "tus-js-client";
import { Upload as TusUpload } from "tus-js-client";
import fs from "fs";
import path from "path";
import mime from "mime-types";

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

export const uploadFile = async ({ file, token, projectId, meta, endpoint }) => {
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
      onSuccess: function () {
        const assetUrl = upload.url.replace("//cloud.", "//assets.").replace("/upload/", "/assets/");
        const documentId = `${assetUrl}`.split("assets/")[1].split("/")[1];

        resolve({ url: assetUrl, documentId });
      },
    }) as IUpload;

    upload.start();
  }) as Promise<IUploadResult>;
};

export interface IUploadResult {
  url: string;
  documentId: string;
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

export const importAssets = async ({ folderPath, token, projectId, endpoint }) => {
  const absoluteFolderPath = path.resolve(__dirname, "..", folderPath);
  console.log("Scanning directory:", absoluteFolderPath);
  const idMap = new Map();

  try {
    const files = getAllFiles(absoluteFolderPath);
    for (const filePath of files) {
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      const fileType = mime.lookup(filePath) || "application/octet-stream";

      const oldId = path.basename(path.dirname(filePath)); // Assuming the old ID is the folder name

      const { documentId } = await uploadFile({
        file: fileBuffer,
        token,
        projectId,
        endpoint,
        meta: {
          filename: fileName,
          filetype: fileType,
        },
      });
      idMap.set(oldId, documentId);
    }
    return idMap;
  } catch (error) {
    console.error("Error importing assets:", error);
    throw error;
  }
};
