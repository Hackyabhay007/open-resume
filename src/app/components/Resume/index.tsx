"use client";
import { useState, useMemo } from "react";
import { ResumeIframeCSR } from "components/Resume/ResumeIFrame";
import { ResumePDF } from "components/Resume/ResumePDF";
import {
  ResumeControlBarCSR,
  ResumeControlBarBorder,
} from "components/Resume/ResumeControlBar";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { useAppSelector } from "lib/redux/hooks";
import { selectResume } from "lib/redux/resumeSlice";
import { selectSettings } from "lib/redux/settingsSlice";
import { DEBUG_RESUME_PDF_FLAG } from "lib/constants";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHyphenationCallback,
} from "components/fonts/hooks";
import { NonEnglishFontsCSSLazyLoader } from "components/fonts/NonEnglishFontsCSSLoader";
import { cx } from "lib/cx";

export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(settings.fontFamily);

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className="flex h-[calc(100vh-var(--top-nav-bar-height))] w-full flex-col overflow-hidden">
        {/* Resume Preview - 80% height */}
        <div className="relative flex h-[80%] justify-center overflow-hidden">
          <FlexboxSpacer maxWidth={50} className="hidden md:block" />
          <div className="relative flex w-full flex-1 flex-col">
            <section className="h-full w-full overflow-hidden bg-gray-100 p-3 md:p-6">
              <ResumeIframeCSR
                documentSize={settings.documentSize}
                scale={scale}
                enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
              >
                <ResumePDF
                  resume={resume}
                  settings={settings}
                  isPDF={DEBUG_RESUME_PDF_FLAG}
                />
              </ResumeIframeCSR>
            </section>
          </div>
          <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </div>

        {/* Controls Section - 20% height */}
        <div className="flex h-[20%] min-h-[120px] flex-col border-t border-gray-200 bg-white">
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>
      </div>
    </>
  );
};
