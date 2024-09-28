import type { MDXComponents } from "mdx/types";

import Image from "./components/Image";
import TableWrapper from "./components/TableWrapper";
import CustomLink from "./components/Link";

export const components: MDXComponents = {
  Image,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  a: CustomLink as any,
  table: TableWrapper,
};
