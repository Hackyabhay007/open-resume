"use client";
import { useState } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "lib/redux/settingsSlice";
import { ProfileForm } from "components/ResumeForm/ProfileForm";
import { WorkExperiencesForm } from "components/ResumeForm/WorkExperiencesForm";
import { EducationsForm } from "components/ResumeForm/EducationsForm";
import { ProjectsForm } from "components/ResumeForm/ProjectsForm";
import { SkillsForm } from "components/ResumeForm/SkillsForm";
import { ThemeForm } from "components/ResumeForm/ThemeForm";
import { CustomForm } from "components/ResumeForm/CustomForm";
import { FlexboxSpacer } from "components/FlexboxSpacer";
import { cx } from "lib/cx";
import {
  BuildingOfficeIcon,
  AcademicCapIcon,
  LightBulbIcon,
  WrenchIcon,
  PlusSmallIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const formTypeToComponent: { [type in ShowForm | 'profile' | 'settings']: () => JSX.Element } = {
  profile: ProfileForm,
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
  settings: ThemeForm,
};

const formTypeToIcon: { [type in ShowForm | 'profile' | 'settings']: typeof UserCircleIcon } = {
  profile: UserCircleIcon,
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
  settings: Cog6ToothIcon,
};

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);
  const [activeTab, setActiveTab] = useState<ShowForm | 'profile' | 'settings'>('profile');

  const allTabs = ['profile', ...formsOrder, 'settings'] as const;

  return (
    <div className="flex h-full">
      {/* Left vertical tab bar */}
      <div className="w-16 border-r border-gray-200 bg-white py-4">
        <div className="flex flex-col items-center space-y-4">
          {allTabs.map((tab) => {
            const Icon = formTypeToIcon[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cx(
                  "p-2 rounded-lg transition-colors",
                  activeTab === tab 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon className="h-6 w-6" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div
        className={cx(
          "flex flex-1 justify-center scrollbar-thin scrollbar-track-gray-100 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
          isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100"
        )}
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <section className="flex max-w-2xl flex-col gap-8 p-[var(--resume-padding)]">
          {(() => {
            const Component = formTypeToComponent[activeTab];
            return <Component key={activeTab} />;
          })()}
        </section>
        <FlexboxSpacer maxWidth={50} className="hidden md:block" />
      </div>
    </div>
  );
};
