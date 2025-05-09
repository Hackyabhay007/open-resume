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
      <div className="relative flex min-h-full w-full flex-col">
        {/* Main content area */}
        <div className="relative flex flex-1 justify-center overflow-hidden md:justify-start">
          <FlexboxSpacer maxWidth={50} className="hidden md:block" />
          <div className="relative flex w-full max-w-5xl flex-1 flex-col">
            <section 
              className={cx(
                "relative flex flex-1 justify-center overflow-hidden",
                "h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))]",
                "px-4 pt-4 md:p-[var(--resume-padding)]"
              )}
            >
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
            <ResumeControlBarCSR
              scale={scale}
              setScale={setScale}
              documentSize={settings.documentSize}
              document={document}
              fileName={resume.profile.name + " - Resume"}
            />
          </div>
          <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </div>
        <ResumeControlBarBorder />
      </div>
    </>
  );
};
