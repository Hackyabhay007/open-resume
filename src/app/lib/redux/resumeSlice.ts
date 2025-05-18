import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "lib/redux/store";
import type {
  FeaturedSkill,
  Resume,
  ResumeEducation,
  ResumeProfile,
  ResumeProject,
  ResumeSkills,
  ResumeWorkExperience,
  ResumeCertification,
  ResumeLanguage,
  ResumePublication,
  ResumeAward,
  ResumeVolunteer,
} from "lib/redux/types";
import type { ShowForm } from "lib/redux/settingsSlice";

export const initialProfile: ResumeProfile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
};

export const initialWorkExperience: ResumeWorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
};

export const initialEducation: ResumeEducation = {
  school: "",
  degree: "",
  gpa: "",
  date: "",
  descriptions: [],
};

export const initialProject: ResumeProject = {
  project: "",
  date: "",
  descriptions: [],
};

export const initialFeaturedSkill: FeaturedSkill = { skill: "", rating: 4 };
export const initialFeaturedSkills: FeaturedSkill[] = Array(6).fill({
  ...initialFeaturedSkill,
});
export const initialSkills: ResumeSkills = {
  featuredSkills: initialFeaturedSkills,
  descriptions: [],
};

export const initialCustom = {
  descriptions: [],
};

export const initialCertification: ResumeCertification = {
  name: "",
  issuer: "",
  date: "",
  descriptions: [],
};

export const initialLanguage: ResumeLanguage = {
  language: "",
  proficiency: "",
  descriptions: [],
};

export const initialPublication: ResumePublication = {
  title: "",
  publisher: "",
  date: "",
  descriptions: [],
};

export const initialAward: ResumeAward = {
  title: "",
  issuer: "",
  date: "",
  descriptions: [],
};

export const initialVolunteer: ResumeVolunteer = {
  organization: "",
  role: "",
  date: "",
  descriptions: [],
};

export const initialResumeState: Resume = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
  certifications: [initialCertification],
  languages: [initialLanguage],
  publications: [initialPublication],
  awards: [initialAward],
  volunteer: [initialVolunteer],
};

// Keep the field & value type in sync with CreateHandleChangeArgsWithDescriptions (components\ResumeForm\types.ts)
export type CreateChangeActionWithDescriptions<T> = {
  idx: number;
} & (
  | {
      field: Exclude<keyof T, "descriptions">;
      value: string;
    }
  | { field: "descriptions"; value: string[] }
);

export const resumeSlice = createSlice({
  name: "resume",
  initialState: initialResumeState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof ResumeProfile; value: string }>
    ) => {
      const { field, value } = action.payload;
      draft.profile[field] = value;
    },
    changeWorkExperiences: (
      draft,
      action: PayloadAction<
        CreateChangeActionWithDescriptions<ResumeWorkExperience>
      >
    ) => {
      const { idx, field, value } = action.payload;
      const workExperience = draft.workExperiences[idx];
      workExperience[field] = value as any;
    },
    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeEducation>>
    ) => {
      const { idx, field, value } = action.payload;
      const education = draft.educations[idx];
      education[field] = value as any;
    },
    changeProjects: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<ResumeProject>>
    ) => {
      const { idx, field, value } = action.payload;
      const project = draft.projects[idx];
      project[field] = value as any;
    },
    changeSkills: (
      draft,
      action: PayloadAction<
        | { field: "descriptions"; value: string[] }
        | {
            field: "featuredSkills";
            idx: number;
            skill: string;
            rating: number;
          }
      >
    ) => {
      const { field } = action.payload;
      if (field === "descriptions") {
        const { value } = action.payload;
        draft.skills.descriptions = value;
      } else {
        const { idx, skill, rating } = action.payload;
        const featuredSkill = draft.skills.featuredSkills[idx];
        featuredSkill.skill = skill;
        featuredSkill.rating = rating;
      }
    },
    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>
    ) => {
      const { value } = action.payload;
      draft.custom.descriptions = value;
    },
    changeCertifications: (
      draft,
      action: PayloadAction<{
        idx: number;
      } & (
        | {
            field: Exclude<keyof ResumeCertification, "descriptions">;
            value: string;
          }
        | { field: "descriptions"; value: string[] }
      )>
    ) => {
      const { idx, field, value } = action.payload;
      if (field === "descriptions") {
        draft.certifications[idx].descriptions = value as string[];
      } else {
        draft.certifications[idx][field] = value as string;
      }
    },
    changeLanguages: (
      draft,
      action: PayloadAction<{
        idx: number;
      } & (
        | {
            field: Exclude<keyof ResumeLanguage, "descriptions">;
            value: string;
          }
        | { field: "descriptions"; value: string[] }
      )>
    ) => {
      const { idx, field, value } = action.payload;
      if (field === "descriptions") {
        draft.languages[idx].descriptions = value as string[];
      } else {
        draft.languages[idx][field] = value as string;
      }
    },
    changePublications: (
      draft,
      action: PayloadAction<{
        idx: number;
      } & (
        | {
            field: Exclude<keyof ResumePublication, "descriptions">;
            value: string;
          }
        | { field: "descriptions"; value: string[] }
      )>
    ) => {
      const { idx, field, value } = action.payload;
      if (field === "descriptions") {
        draft.publications[idx].descriptions = value as string[];
      } else {
        draft.publications[idx][field] = value as string;
      }
    },
    changeAwards: (
      draft,
      action: PayloadAction<{
        idx: number;
      } & (
        | {
            field: Exclude<keyof ResumeAward, "descriptions">;
            value: string;
          }
        | { field: "descriptions"; value: string[] }
      )>
    ) => {
      const { idx, field, value } = action.payload;
      if (field === "descriptions") {
        draft.awards[idx].descriptions = value as string[];
      } else {
        draft.awards[idx][field] = value as string;
      }
    },
    changeVolunteer: (
      draft,
      action: PayloadAction<{
        idx: number;
      } & (
        | {
            field: Exclude<keyof ResumeVolunteer, "descriptions">;
            value: string;
          }
        | { field: "descriptions"; value: string[] }
      )>
    ) => {
      const { idx, field, value } = action.payload;
      if (field === "descriptions") {
        draft.volunteer[idx].descriptions = value as string[];
      } else {
        draft.volunteer[idx][field] = value as string;
      }
    },
    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload;
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkExperience));
          return draft;
        }
        case "educations": {
          draft.educations.push(structuredClone(initialEducation));
          return draft;
        }
        case "projects": {
          draft.projects.push(structuredClone(initialProject));
          return draft;
        }
      }
    },
    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm;
        idx: number;
        direction: "up" | "down";
      }>
    ) => {
      const { form, idx, direction } = action.payload;
      if (form !== "skills" && form !== "custom") {
        if (
          (idx === 0 && direction === "up") ||
          (idx === draft[form].length - 1 && direction === "down")
        ) {
          return draft;
        }

        const section = draft[form][idx];
        if (direction === "up") {
          draft[form][idx] = draft[form][idx - 1];
          draft[form][idx - 1] = section;
        } else {
          draft[form][idx] = draft[form][idx + 1];
          draft[form][idx + 1] = section;
        }
      }
    },
    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>
    ) => {
      const { form, idx } = action.payload;
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(idx, 1);
      }
    },
    setResume: (draft, action: PayloadAction<Resume>) => {
      return action.payload;
    },
  },
});

export const {
  changeProfile,
  changeWorkExperiences,
  changeEducations,
  changeProjects,
  changeSkills,
  changeCustom,
  changeCertifications,
  changeLanguages,
  changePublications,
  changeAwards,
  changeVolunteer,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIdx,
  setResume,
} = resumeSlice.actions;

export const selectResume = (state: RootState) => state.resume;
export const selectProfile = (state: RootState) => state.resume.profile;
export const selectWorkExperiences = (state: RootState) =>
  state.resume.workExperiences;
export const selectEducations = (state: RootState) => state.resume.educations;
export const selectProjects = (state: RootState) => state.resume.projects;
export const selectSkills = (state: RootState) => state.resume.skills;
export const selectCustom = (state: RootState) => state.resume.custom;
export const selectCertifications = (state: RootState) => state.resume.certifications;
export const selectLanguages = (state: RootState) => state.resume.languages;
export const selectPublications = (state: RootState) => state.resume.publications;
export const selectAwards = (state: RootState) => state.resume.awards;
export const selectVolunteer = (state: RootState) => state.resume.volunteer;

export default resumeSlice.reducer;
