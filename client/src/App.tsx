import { useState } from 'react';
import './App.css';
import QuestionAndOptions from './Components/Question';

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

function App() {
  const [questionsData, setQuestionsData] = useState<
    IQuestionData[] | null
  >(null);

  return (
    <div className="App">
      <QuestionAndOptions
        questionsData={questionsData}
        setQuestionsData={setQuestionsData}
      />
    </div>
  );
}

export default App;
