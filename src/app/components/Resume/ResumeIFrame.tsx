"use client";
import { useMemo } from "react";
import Frame from "react-frame-component";
import {
  A4_HEIGHT_PX,
  A4_WIDTH_PX,
  A4_WIDTH_PT,
  LETTER_HEIGHT_PX,
  LETTER_WIDTH_PX,
  LETTER_WIDTH_PT,
} from "lib/constants";
import dynamic from "next/dynamic";
import { getAllFontFamiliesToLoad } from "components/fonts/lib";
import { cx } from "lib/cx";

const getIframeInitialContent = (isA4: boolean) => {
  const width = isA4 ? A4_WIDTH_PT : LETTER_WIDTH_PT;
  const allFontFamilies = getAllFontFamiliesToLoad();

  const allFontFamiliesPreloadLinks = allFontFamilies
    .map(
      (font) => 
`<link rel="preload" as="font" href="/fonts/${font}-Regular.ttf" type="font/ttf" crossorigin="anonymous">
<link rel="preload" as="font" href="/fonts/${font}-Bold.ttf" type="font/ttf" crossorigin="anonymous">`
    )
    .join("");

  const allFontFamiliesFontFaces = allFontFamilies
    .map(
      (font) => 
`@font-face {font-family: "${font}"; src: url("/fonts/${font}-Regular.ttf");}
@font-face {font-family: "${font}"; src: url("/fonts/${font}-Bold.ttf"); font-weight: bold;}`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
  <head>
    ${allFontFamiliesPreloadLinks}
    <style>
      ${allFontFamiliesFontFaces}
      body {
        margin: 0;
        padding: 0;
        width: ${width}pt;
        -webkit-text-size-adjust: none;
        overflow: hidden;
      }
    </style>
  </head>
  <body><div></div></body>
</html>`;
};

const ResumeIframe = ({
  documentSize,
  scale,
  children,
  enablePDFViewer = false,
}: {
  documentSize: string;
  scale: number;
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}) => {
  const isA4 = documentSize === "A4";
  const iframeInitialContent = useMemo(
    () => getIframeInitialContent(isA4),
    [isA4]
  );

  if (enablePDFViewer) {
    return (
      <DynamicPDFViewer className="h-full w-full">
        {children as any}
      </DynamicPDFViewer>
    );
  }

  const width = isA4 ? A4_WIDTH_PX : LETTER_WIDTH_PX;
  const height = isA4 ? A4_HEIGHT_PX : LETTER_HEIGHT_PX;

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden ">
      <div 
        className="relative"
        style={{
          width: `${width * scale}px`,
          height: `${height * scale}px`,
        }}
      >
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: '0 0'
          }}
          className="absolute left-0 top-0 bg-white shadow-lg"
        >
          <Frame
            style={{ width: "100%", height: "100%" }}
            initialContent={iframeInitialContent}
            key={isA4 ? "A4" : "LETTER"}
          >
            {children}
          </Frame>
        </div>
      </div>
    </div>
  );
};

export const ResumeIframeCSR = dynamic(() => Promise.resolve(ResumeIframe), {
  ssr: false,
});

const DynamicPDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((module) => module.PDFViewer),
  { ssr: false }
);
