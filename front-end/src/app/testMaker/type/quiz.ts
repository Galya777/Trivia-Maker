export type Quiz = {
    category: string;
    correct_answer: string;
    userAnswer: string;
    difficulty: string;
    incorrect_answers: string[];
    all_answers: string[];
    question: string;
    type: string;
  };
  export type Option = {
    id: string;
    name: string;
  };
  export type CategoryListResponse = {
    trivia_categories: Option[];
  };
  
  export type QuizeListResponse = {
    response_code: number;
    results: Quiz[];
  };