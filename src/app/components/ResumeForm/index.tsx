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
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

type AllFormTypes = ShowForm | 'profile' | 'settings';

const formTypeToComponent: { [type in AllFormTypes]: () => JSX.Element } = {
  profile: ProfileForm,
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
  settings: ThemeForm,
};

const formTypeToIcon: { [type in AllFormTypes]: typeof UserCircleIcon } = {
  profile: UserCircleIcon,
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
  settings: Cog6ToothIcon,
};

const formTypeToLabel: { [type in AllFormTypes]: string } = {
  profile: 'Profile',
  workExperiences: 'Experience',
  educations: 'Education',
  projects: 'Projects',
  skills: 'Skills',
  custom: 'Custom',
  settings: 'Settings'
};

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
  allTabs,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  activeTab: AllFormTypes;
  setActiveTab: (tab: AllFormTypes) => void;
  allTabs: readonly AllFormTypes[];
}) => (
  <div className={cx(
    "bg-white border-r border-gray-200",
    "fixed inset-y-0 left-0 z-20 w-64 transform transition-transform duration-300 ease-in-out md:sticky md:top-[var(--top-nav-bar-height)] md:h-[calc(100vh-var(--top-nav-bar-height))] md:w-20 md:translate-x-0",
    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
  )}>
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 md:hidden">
        <h2 className="text-xl font-semibold">Sections</h2>
        <button onClick={() => setIsSidebarOpen(false)}>
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-3">
        {allTabs.map((tab) => {
          const Icon = formTypeToIcon[tab];
          return (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsSidebarOpen(false);
              }}
              className={cx(
                "flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-colors",
                "md:flex-col md:gap-1",
                activeTab === tab 
                  ? "bg-blue-50 text-blue-600" 
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="md:text-xs">{formTypeToLabel[tab]}</span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export const ResumeForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const formsOrder = useAppSelector(selectFormsOrder);
  const [isHover, setIsHover] = useState(false);
  const [activeTab, setActiveTab] = useState<AllFormTypes>('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const allTabs = ['profile', ...formsOrder, 'settings'] as const;

  return (
    <div className="flex min-h-full">
      <Sidebar 
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        allTabs={allTabs}
      />

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-800/30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-3 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          >
            <Bars3Icon className="h-6 w-6" />
            <span className="font-semibold">{formTypeToLabel[activeTab]}</span>
          </button>
        </div>

        <main 
          className={cx(
            "flex flex-1 justify-center overflow-y-auto scrollbar-thin scrollbar-track-gray-100",
            isHover ? "scrollbar-thumb-gray-200" : "scrollbar-thumb-gray-100"
          )}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="w-full max-w-3xl flex-1 p-[var(--resume-padding)]">
            {(() => {
              const Component = formTypeToComponent[activeTab];
              return <Component key={activeTab} />;
            })()}
          </div>
          <FlexboxSpacer maxWidth={50} className="hidden md:block" />
        </main>
      </div>
    </div>
  );
};
