"use client";

import React, { useState } from "react";
import SeparateLine from "@/components/hr";
import { GlobalWorkerOptions, PDFDocumentProxy, getDocument } from "pdfjs-dist";
import { downloadZip } from "client-zip";
import Image from "next/image";

const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result == null) {
        reject("Failed to read file.");
        return;
      }
      resolve(reader.result as ArrayBuffer);
    };
    reader.readAsArrayBuffer(file);
  });
};

const getPages = (page: string, numPages: number): number[] => {
  let pages: number[] = [];
  const pageStrs = page.split(/[,; ]/);
  for (let i = 0; i < pageStrs.length; i++) {
    const pageStr = pageStrs[i];
    if (pageStr.length == 0) {
      continue;
    }
    const page = Number(pageStr);
    if (isNaN(page)) {
      continue;
    }
    if (page == -1) {
      pages = [];
      for (let i = 0; i < numPages; i++) {
        pages.push(i + 1);
      }
      return pages;
    }
    if (page <= 0 || page > numPages) {
      continue;
    }
    pages.push(page);
  }
  return pages;
};

const PDF2Pic: React.FC = () => {
  const [width, setWidth] = useState<number>(2448);
  const [height, setHeight] = useState<number>(3168);
  const [page, setPage] = useState<string>("-1");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [images, setImages] = useState<([string, number] | undefined)[]>([]);
  const [pdf, setPdf] = useState<PDFDocumentProxy | undefined>(undefined);
  const [filename, setFilename] = useState<string>("");
  const [fixAspectRatio, setFixAspectRatio] = useState<boolean>(true);

  const pdfjsWorker = require("pdfjs-dist/build/pdf.worker");
  GlobalWorkerOptions.workerSrc =
    pdfjsWorker + "pdfjs-dist/build/pdf.worker.mjs";

  return (
    <>
      <input
        type="file"
        accept=".pdf"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (file == undefined) {
            setErrorMsg("Please select a PDF file.");
            return;
          }
          setErrorMsg("");
          setImages([]);

          getDocument(await fileToArrayBuffer(file))
            .promise.then((pdf) => {
              setPdf(pdf);
              setFilename(file.name);
            })
            .catch((error) => {
              setErrorMsg(error);
            });
        }}
      />
      <SeparateLine />
      Please set the width of the exported image.
      <br />
      <input
        type="number"
        value={width}
        onChange={(event) => {
          const value = Number(event.target.value);
          if (value <= 0) {
            setErrorMsg("Width should be positive.");
            return;
          }
          setWidth(value);
        }}
      />
      <p className={fixAspectRatio ? "text-gray-500" : ""}>
        Please set the height of the exported image. Disabled if Fix Aspect
        Ratio is checked.
      </p>
      <input
        type="number"
        value={height}
        disabled={fixAspectRatio}
        onChange={(event) => {
          const value = Number(event.target.value);
          if (value <= 0) {
            setErrorMsg("Height should be positive.");
            return;
          }
          setHeight(value);
        }}
      />
      <br />
      <input
        type="checkbox"
        checked={fixAspectRatio}
        onChange={(event) => {
          setFixAspectRatio(event.target.checked);
          if (event.target.checked) {
            setHeight(width);
          }
        }}
      />
      Fix Aspect Ratio. Checked if the height should be the determined by the
      width.
      <SeparateLine />
      Please set the page number of the exported image. -1 means all pages. Use
      comma, space or semicolon to separate multiple pages.
      <br />
      <input
        type="text"
        value={page}
        onChange={(event) => {
          const value = event.target.value;
          setPage(value);
        }}
      />
      <SeparateLine />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={async () => {
          setErrorMsg("");
          if (pdf == undefined) {
            setErrorMsg("Please select a PDF file.");
            return;
          }

          const images: ([string, number] | undefined)[] = [];
          const pages = getPages(page, pdf.numPages);
          if (pages.length == 0) {
            setErrorMsg("Please input valid page numbers.");
            return;
          }
          for (let i = 0; i < pages.length; i++) {
            const pageIndex = pages[i];
            pdf.getPage(pageIndex).then((page) => {
              const viewport = page.getViewport({ scale: 1 });
              let scale = width / viewport.width;
              let targetHeight: number = height;
              if (fixAspectRatio) {
                setHeight(viewport.height * scale);
                targetHeight = viewport.height * scale;
              }
              const canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = targetHeight;
              const context = canvas.getContext("2d");
              if (context == null) {
                setErrorMsg("Failed to get context.");
                return;
              }
              const renderContext = {
                canvasContext: context,
                viewport: page.getViewport({ scale }),
              };
              page.render(renderContext).promise.then(() => {
                images[i] = [canvas.toDataURL("image/png"), pageIndex];
                setImages(images);
              });
            });
          }
        }}
      >
        Convert PDF
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={async () => {
          if (images.length == 1) {
            const image = images[0];
            const a = document.createElement("a");
            a.href = image?.[0] ?? "";
            a.download = `${filename}_${image?.[1]}.png`;
            a.click();
            a.remove();
            return;
          }

          const filesP = images.map(async (image) => {
            // convert image to blob
            const response = await fetch(image?.[0] ?? "");
            const blob = await response.blob();
            // make a File object
            const file = new File([blob], `${filename}_${image?.[1]}.png`);
            return file;
          });
          const files = await Promise.all(filesP);

          const zip = await downloadZip(files).blob();
          // make and click a temporary link to download the Blob
          const link = document.createElement("a");
          link.href = URL.createObjectURL(zip);
          link.download = `${filename}.zip`;
          link.click();
          link.remove();
        }}
      >
        Download All Images
      </button>
      <SeparateLine />
      <div className="text-red-500" hidden={errorMsg.length == 0}>
        {errorMsg}
      </div>
      <div className="flex flex-wrap" hidden={errorMsg.length != 0}>
        {images.map((image) => {
          if (image == undefined) {
            return <></>;
          }
          return (
            <div key={`${filename}_${image[1]}.png`} className="m-2">
              <Image
                src={image[0]}
                alt="PDF to Image"
                width={width}
                height={height}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PDF2Pic;
