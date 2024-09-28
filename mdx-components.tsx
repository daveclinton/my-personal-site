import type { MDXComponents } from "mdx/types";
import TOCInline from "pliny/ui/TOCInline";
import Pre from "pliny/ui/Pre";
import BlogNewsletterForm from "pliny/ui/BlogNewsletterForm";
import Image from "./components/Image";
import TableWrapper from "./components/TableWrapper";
import CustomLink from "./components/Link";

export const components: MDXComponents = {
  Image,
  TOCInline,
  pre: Pre,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: CustomLink as any,
  table: TableWrapper,
  BlogNewsletterForm,
};
