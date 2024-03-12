export type ProviderName = "caisy" | "contentful" | "strapi" | "prismic";

export type ImportFunc = (props: any & ProviderProcess) => void;
export type ExportFunc = (props: any & ProviderProcess) => void;
// export type normalizeManyContentTypeFunc = (props: any) => void;
// export type normalizeContentTypeFunc = (props: any) => void;
// export type denormalizeManyContentTypeFunc = (props: any) => void;
// export type denormalizeContentTypeFunc = (props: any) => void;
// export type normalizeManyEntryFunc = (props: any) => void;
// export type normalizeEntryFunc = (props: any) => void;
// export type denormalizeManyEntryFunc = (props: any) => void;
// export type denormalizeEntryFunc = (props: any) => void;

export interface Provider {
  name: ProviderName;
  import: ImportFunc;
  export: ExportFunc;
  checkCredentials: () => Promise<boolean>;
  // normalizeManyContentType: normalizeManyContentTypeFunc,
  // normalizeContentTypeFunc: normalizeContentTypeFunc,
  // denormalizeManyContentType: denormalizeManyContentTypeFunc,
  // denormalizeContentTypeFunc: denormalizeContentTypeFunc,
  // normalizeManyEntry: normalizeManyEntryFunc,
  // normalizeEntryFunc: normalizeEntryFunc,
  // denormalizeManyEntry: denormalizeManyEntryFunc,
  // denormalizeEntryFunc: denormalizeEntryFunc,
}

export type onError = ({ error, step, meta }: { error: Error; step: string; meta: any }) => void;
export type onProgress = ({ step, value }: { step: string; value: number }) => void;

export interface ProviderProcess {
  onError: onError;
  onProgress: onProgress;
}

// normalizeManyContentType: normalizeManyContentTypeFunc,
// normalizeContentTypeFunc: normalizeContentTypeFunc,
// denormalizeManyContentType: denormalizeManyContentTypeFunc,
// denormalizeContentTypeFunc: denormalizeContentTypeFunc,
// normalizeManyEntry: normalizeManyEntryFunc,
// normalizeEntryFunc: normalizeEntryFunc,
// denormalizeManyEntry: denormalizeManyEntryFunc,
// denormalizeEntryFunc: denormalizeEntryFunc,
