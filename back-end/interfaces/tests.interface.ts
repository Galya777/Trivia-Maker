export interface ITest {
  id?: string;
  name: string;
  category: string;
  description?: string;
  tags: string[];
  references: string[];
  isPublic: boolean;
  isPremium: boolean;
  questions: IQuestion[];
}

export interface IQuestion {
  id?: string;
  type: string;
  content: string;
  answers: IAnswer[];
}

export interface IAnswer {
  id?: string;
  content: string;
  weight: number;
}

export interface ICompetition {
  id?: string;
  name: string;
  token: string;
}

export interface ITestResult {
  id?: string;
  score: number;
  answers: any;
}