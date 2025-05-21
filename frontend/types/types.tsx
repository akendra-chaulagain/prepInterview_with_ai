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
