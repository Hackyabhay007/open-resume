"use client";
import { useEffect } from "react";
import { useSetDefaultScale } from "components/Resume/hooks";
import {
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { usePDF } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { cx } from "lib/cx";

const ResumeControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update();
  }, [update, document]);

  return (
    <div className="flex h-full flex-col justify-center px-4 md:px-8">
      {/* Zoom Controls */}
      <div className="mb-3 flex w-full items-center gap-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
        <div className="flex flex-1 items-center gap-3">
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.01}
            value={scale}
            onChange={(e) => {
              setScaleOnResize(false);
              setScale(Number(e.target.value));
            }}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200"
          />
          <div className="w-16 text-sm text-gray-600">{`${Math.round(scale * 100)}%`}</div>
        </div>
        
        <label className="hidden items-center gap-2 whitespace-nowrap text-sm lg:flex">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300"
            checked={scaleOnResize}
            onChange={() => setScaleOnResize((prev) => !prev)}
          />
          <span className="select-none text-gray-600">Auto-fit</span>
        </label>
      </div>

      {/* Download Button */}
      <a
        className={cx(
          "flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5",
          "text-sm font-medium text-gray-700 shadow-sm transition-colors",
          "hover:bg-gray-50 active:bg-gray-100"
        )}
        href={instance.url!}
        download={fileName}
      >
        <ArrowDownTrayIcon className="h-4 w-4" />
        <span>Download Resume</span>
      </a>
    </div>
  );
};

export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => null;
