export type ProviderName = "caisy" | "contentful" | "strapi" | "prismic";

export type ImportFunc = (props: any) => void;
export type ExportFunc = (props: any) => void;
// export type normalizeManyContentTypeFunc = (props: any) => void;
// export type normalizeContentTypeFunc = (props: any) => void;
// export type denormalizeManyContentTypeFunc = (props: any) => void;
// export type denormalizeContentTypeFunc = (props: any) => void;
// export type normalizeManyEntryFunc = (props: any) => void;
// export type normalizeEntryFunc = (props: any) => void;
// export type denormalizeManyEntryFunc = (props: any) => void;
// export type denormalizeEntryFunc = (props: any) => void;

export interface IProvider {
  name: ProviderName;
  import: ImportFunc;
  export: ExportFunc;
  // normalizeManyContentType: normalizeManyContentTypeFunc,
  // normalizeContentTypeFunc: normalizeContentTypeFunc,
  // denormalizeManyContentType: denormalizeManyContentTypeFunc,
  // denormalizeContentTypeFunc: denormalizeContentTypeFunc,
  // normalizeManyEntry: normalizeManyEntryFunc,
  // normalizeEntryFunc: normalizeEntryFunc,
  // denormalizeManyEntry: denormalizeManyEntryFunc,
  // denormalizeEntryFunc: denormalizeEntryFunc,
}
