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
      <div className="flex h-[calc(100vh-var(--top-nav-bar-height))] w-full flex-col bg-gray-50">
        {/* Resume Preview Area */}
        <div className="flex h-[calc(100%-120px)] min-h-0 w-full justify-center overflow-hidden">
          <FlexboxSpacer maxWidth={50} className="hidden md:block" />
          <div className="h-full w-full max-w-[1200px]">
            <section className="h-full w-full overflow-hidden">
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

        {/* Fixed Controls Section */}
        <div className="h-[120px] shrink-0 border-t border-gray-200 bg-white">
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
