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
    <div className="sticky bottom-0 left-0 right-0 z-10 bg-white">
      <div className={cx(
        "flex min-h-[var(--resume-control-bar-height)] flex-col gap-2 p-3",
        "md:h-[var(--resume-control-bar-height)] md:flex-row md:items-center md:justify-between md:px-[var(--resume-padding)]"
      )}>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="flex flex-1 items-center gap-2 md:flex-initial">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" aria-hidden="true" />
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
              className="w-full max-w-[140px] md:w-[140px]"
            />
            <div className="w-12 text-sm text-gray-600">{`${Math.round(scale * 100)}%`}</div>
          </div>
          
          <label className="hidden items-center gap-1 whitespace-nowrap text-sm lg:flex">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4"
              checked={scaleOnResize}
              onChange={() => setScaleOnResize((prev) => !prev)}
            />
            <span className="select-none text-gray-600">Auto-fit</span>
          </label>
        </div>
        
        <a
          className={cx(
            "flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 px-4 py-2",
            "text-sm text-gray-600 hover:bg-gray-50 active:bg-gray-100",
            "transition-colors duration-150",
            "md:w-auto"
          )}
          href={instance.url!}
          download={fileName}
        >
          <ArrowDownTrayIcon className="h-4 w-4" />
          <span className="whitespace-nowrap">Download Resume</span>
        </a>
      </div>
    </div>
  );
};

/**
 * Load ResumeControlBar client side since it uses usePDF, which is a web specific API
 */
export const ResumeControlBarCSR = dynamic(
  () => Promise.resolve(ResumeControlBar),
  {
    ssr: false,
  }
);

export const ResumeControlBarBorder = () => (
  <div className="absolute bottom-[var(--resume-control-bar-height)] w-full border-t bg-gray-100" />
);
