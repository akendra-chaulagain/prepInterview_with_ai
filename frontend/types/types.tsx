export interface AnswerItem {
  question: string;
  answer: string;
  score: number;
  feedback: string[];
}

export interface InterviewResult {
  answers: AnswerItem[];
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  currentIndex: number;
  difficulty: "easy" | "medium" | "hard";
  interviewType: "behavioral" | "technical" | "system design";
  jobRole: string;
  overallScore: number;
  question: string[];
  technology: string;
}

export interface SummitAns {
  feedback: string;
  score: number;
}

//  for mock text  results
export interface MockInterViewResults {
  _id: string;
  jobRole: string;
  interviewType: string;
  updatedAt: string;
  technology: string;
  difficulty: string;
  completed: boolean;
  duration: string;
  overallScore: number;
  length: number;
}
