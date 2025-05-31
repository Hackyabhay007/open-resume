"use client";
import { useState, useMemo, ReactElement } from "react";
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
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

// Create a simple fallback element for empty PDF document
const EmptyPDFDocument = () => <div className="hidden"></div>;

export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);

  // Ensure settings has default values
  const safeSettings = {
    ...settings,
    documentSize: settings.documentSize || "Letter",
    fontFamily: settings.fontFamily || "Inter",
    fontSize: settings.fontSize || "11",
    themeColor: settings.themeColor || "#4F46E5", // Updated to match UI in screenshot
  };

  // Ensure resume has all required properties with defaults
  const safeResume = {
    ...resume,
    profile: {
      ...(resume.profile || {}),
      linkedin: resume.profile?.linkedin || '',
      github: resume.profile?.github || '',
      twitter: resume.profile?.twitter || '',
    },
    workExperiences: resume.workExperiences || [],
    educations: resume.educations || [],
    projects: resume.projects || [],
    skills: resume.skills || { featuredSkills: [], descriptions: [] },
    custom: resume.custom || { descriptions: [] },
  };

  // Memoize the document with proper error handling
  const document = useMemo<ReactElement>(() => {
    try {
      return <ResumePDF resume={safeResume} settings={safeSettings} isPDF={true} />;
    } catch (error) {
      console.error("Error rendering PDF:", error);
      return <EmptyPDFDocument />;
    }
  }, [safeResume, safeSettings]);

  useRegisterReactPDFFont();
  useRegisterReactPDFHyphenationCallback(safeSettings.fontFamily);

  return (
    <>
      <NonEnglishFontsCSSLazyLoader />
      <div className="flex h-[calc(100vh-var(--top-nav-bar-height))] w-full flex-col bg-white">
        {/* Header for mobile */}
      

        {/* Resume Preview Area with blue background accent */}
        <div className="flex flex-col flex-1 bg-white">

          <div className="flex flex-1 min-h-0 w-full justify-center overflow-hidden p-4">
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
            <div className="h-full w-full max-w-[1200px] rounded-lg shadow-sm border border-gray-100">
              <section className="h-full w-full overflow-hidden">
                <ResumeIframeCSR
                  documentSize={safeSettings.documentSize}
                  scale={scale}
                  enablePDFViewer={DEBUG_RESUME_PDF_FLAG}
                >
                  <ResumePDF
                    resume={safeResume}
                    settings={safeSettings}
                    isPDF={DEBUG_RESUME_PDF_FLAG}
                  />
                </ResumeIframeCSR>
              </section>
            </div>
            <FlexboxSpacer maxWidth={50} className="hidden md:block" />
          </div>
        </div>

        {/* Fixed Controls Section */}
        <div className="h-[120px] shrink-0 border-t border-gray-200 bg-white">
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={safeSettings.documentSize}
            document={document}
            fileName={(safeResume.profile.name || "Resume") + " - Resume"}
          />
        </div>
      </div>
    </>
  );
};
