export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
}

export interface ResumeWorkExperience {
  company: string;
  jobTitle: string;
  date: string;
  descriptions: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  date: string;
  gpa: string;
  descriptions: string[];
}

export interface ResumeProject {
  project: string;
  date: string;
  descriptions: string[];
}

export interface FeaturedSkill {
  skill: string;
  rating: number;
}

export interface ResumeSkills {
  featuredSkills: FeaturedSkill[];
  descriptions: string[];
}

export interface ResumeCustom {
  descriptions: string[];
}

export interface ResumeCertification {
  name: string;
  issuer: string;
  date: string;
  descriptions: string[];
}

export interface ResumeLanguage {
  language: string;
  proficiency: string;
  descriptions: string[];
}

export interface ResumePublication {
  title: string;
  publisher: string;
  date: string;
  descriptions: string[];
}

export interface ResumeAward {
  title: string;
  issuer: string;
  date: string;
  descriptions: string[];
}

export interface ResumeVolunteer {
  organization: string;
  role: string;
  date: string;
  descriptions: string[];
}

export interface Resume {
  profile: ResumeProfile;
  workExperiences: ResumeWorkExperience[];
  educations: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkills;
  custom: ResumeCustom;
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
  publications: ResumePublication[];
  awards: ResumeAward[];
  volunteer: ResumeVolunteer[];
}

export type ResumeKey = keyof Resume;
