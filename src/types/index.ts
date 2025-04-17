
export type Industry = 
  | "Technology" 
  | "Finance" 
  | "Healthcare" 
  | "Education" 
  | "Manufacturing"
  | "Retail"
  | "Marketing"
  | "Hospitality";

export type InterviewType = "Technical" | "Non-Technical";

export type Language = 
  | "English" 
  | "Spanish" 
  | "French" 
  | "German" 
  | "Mandarin" 
  | "Hindi" 
  | "Arabic"
  | "Russian";

export type ExperienceLevel = 
  | "Entry Level (0-1 years)" 
  | "Junior (1-3 years)" 
  | "Mid-Level (3-5 years)" 
  | "Senior (5-10 years)" 
  | "Expert (10+ years)";

export interface Question {
  id: string;
  text: string;
  industry: Industry;
  type: InterviewType;
  language: Language;
  experienceLevel: ExperienceLevel;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  appliedPosition: string;
  interviewDate: string;
  status: "Pending" | "Completed" | "No Show";
  notes?: string;
}

export interface Interview {
  id: string;
  title: string;
  createdAt: string;
  industry: Industry;
  type: InterviewType;
  language: Language;
  experienceLevel: ExperienceLevel;
  questions: Question[];
  students: Student[];
}
