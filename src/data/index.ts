
import { Industry, InterviewType, Language, ExperienceLevel, Interview, Question, Student } from "@/types";

// Mock questions data
export const questions: Question[] = [
  {
    id: "q1",
    text: "Explain the difference between RESTful and GraphQL APIs and when you would use each.",
    industry: "Technology",
    type: "Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)"
  },
  {
    id: "q2",
    text: "How do you handle state management in React applications?",
    industry: "Technology",
    type: "Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)"
  },
  {
    id: "q3",
    text: "Explain how you would design a database schema for an e-commerce website.",
    industry: "Technology",
    type: "Technical",
    language: "English",
    experienceLevel: "Senior (5-10 years)"
  },
  {
    id: "q4",
    text: "Tell me about a challenging project you worked on and how you overcame obstacles.",
    industry: "Technology",
    type: "Non-Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)"
  },
  {
    id: "q5",
    text: "How do you prioritize tasks when working on multiple projects with tight deadlines?",
    industry: "Technology",
    type: "Non-Technical",
    language: "English",
    experienceLevel: "Junior (1-3 years)"
  },
  {
    id: "q6",
    text: "Describe your experience with agile development methodologies.",
    industry: "Technology",
    type: "Non-Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)"
  },
  {
    id: "q7",
    text: "Explain the accounting equation and how it relates to the balance sheet.",
    industry: "Finance",
    type: "Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)"
  },
  {
    id: "q8",
    text: "What strategies would you use to improve patient satisfaction scores?",
    industry: "Healthcare",
    type: "Non-Technical",
    language: "English",
    experienceLevel: "Senior (5-10 years)"
  },
  {
    id: "q9",
    text: "How do you develop engaging curriculum for diverse learning needs?",
    industry: "Education",
    type: "Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)"
  },
  {
    id: "q10",
    text: "Describe a marketing campaign you developed that significantly increased brand awareness.",
    industry: "Marketing",
    type: "Technical",
    language: "English",
    experienceLevel: "Senior (5-10 years)"
  }
];

// Mock students data
export const students: Student[] = [
  {
    id: "s1",
    name: "Arjun Patel",
    email: "arjun.patel@email.com",
    phoneNumber: "(555) 123-4567",
    appliedPosition: "Frontend Developer",
    interviewDate: "2025-04-15T10:00:00",
    status: "Completed",
    notes: "Strong React knowledge, good communication skills."
  },
  {
    id: "s2",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phoneNumber: "(555) 234-5678",
    appliedPosition: "Backend Developer",
    interviewDate: "2025-04-16T14:30:00",
    status: "Completed",
    notes: "Excellent problem-solving skills, experience with Node.js and MongoDB."
  },
  {
    id: "s3",
    name: "Rahul Verma",
    email: "rahul.verma@email.com",
    phoneNumber: "(555) 345-6789",
    appliedPosition: "Full Stack Developer",
    interviewDate: "2025-04-17T11:00:00",
    status: "Pending"
  },
  {
    id: "s4",
    name: "Neha Gupta",
    email: "neha.gupta@email.com",
    phoneNumber: "(555) 456-7890",
    appliedPosition: "UI/UX Designer",
    interviewDate: "2025-04-18T13:00:00",
    status: "No Show"
  },
  {
    id: "s5",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phoneNumber: "(555) 567-8901",
    appliedPosition: "Product Manager",
    interviewDate: "2025-04-19T15:00:00",
    status: "Pending"
  }
];

// Mock interview data
export const interviews: Interview[] = [
  {
    id: "i1",
    title: "Frontend Developer Interview - Q2 2025",
    createdAt: "2025-04-10T09:30:00",
    industry: "Technology",
    type: "Technical",
    language: "English",
    experienceLevel: "Mid-Level (3-5 years)",
    questions: [questions[0], questions[1], questions[3], questions[4]],
    students: [students[0], students[2]]
  },
  {
    id: "i2",
    title: "Backend Developer Interview - April 2025",
    createdAt: "2025-04-11T11:45:00",
    industry: "Technology",
    type: "Technical",
    language: "English",
    experienceLevel: "Senior (5-10 years)",
    questions: [questions[0], questions[2], questions[3], questions[5]],
    students: [students[1]]
  },
  {
    id: "i3",
    title: "UI/UX Designer Interview - Spring 2025",
    createdAt: "2025-04-12T14:15:00",
    industry: "Technology",
    type: "Non-Technical",
    language: "English",
    experienceLevel: "Junior (1-3 years)",
    questions: [questions[3], questions[4], questions[5]],
    students: [students[3]]
  },
  {
    id: "i4",
    title: "Product Manager Interview - April 2025",
    createdAt: "2025-04-13T10:00:00",
    industry: "Technology",
    type: "Non-Technical",
    language: "English",
    experienceLevel: "Senior (5-10 years)",
    questions: [questions[3], questions[4], questions[5]],
    students: [students[4]]
  }
];

// Function to filter questions based on parameters
export const getQuestionSuggestions = (
  industry: Industry,
  type: InterviewType,
  language: Language,
  experienceLevel: ExperienceLevel
): Question[] => {
  return questions.filter(
    (question) =>
      question.industry === industry &&
      question.type === type &&
      question.language === language &&
      question.experienceLevel === experienceLevel
  );
};

// Function to add a new interview
export const addInterview = (newInterview: Omit<Interview, "id" | "createdAt">): Interview => {
  const interview: Interview = {
    ...newInterview,
    id: `i${interviews.length + 1}`,
    createdAt: new Date().toISOString(),
  };
  
  interviews.push(interview);
  return interview;
};
