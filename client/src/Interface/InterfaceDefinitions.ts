export interface IQuestionData {
  id: number;
  answer: string;
  question: string;
  value: number;
  airdate: string;
  created_at: string;
  updated_at: string;
  category_id: number;
  game_id: number;
  invalid_count: number;
  category: {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
    clues_count: number;
  };
}

export interface IAnsweredData {
  questionId: number;
  answer: string;
  timeTaken: number;
  correct: boolean;
}

export interface IResultStats {
  id: number;
  timeTaken: number | string;
  status: 'correct' | 'incorrect' | 'unattempted';
  answerSelected: string;
  correctAnswer: string;
}
