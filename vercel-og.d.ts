declare module "@vercel/og" {
  import { ReactElement } from "react";

  export interface ImageResponseOptions {
    width?: number;
    height?: number;
    emoji?: "twemoji" | "blobmoji" | "noto" | "openmoji";
    fonts?: {
      name: string;
      data: ArrayBuffer;
      weight: number;
      style: "normal" | "italic";
    }[];
    debug?: boolean;
  }

  export class ImageResponse extends Response {
    constructor(element: ReactElement, options?: ImageResponseOptions);
  }
}
