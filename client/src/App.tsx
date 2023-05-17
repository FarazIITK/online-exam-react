import { useEffect, useState } from 'react';
import './App.css';
import QuestionAndOptions from './Components/Question';
import axios from 'axios';

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
  // State to store data from the API response
  const [questionsData, setQuestionsData] = useState<
    IQuestionData[] | null
  >(null);
  // State to handle whether the questions data is loaded
  const [isQuestionsLoaded, setIsQuestionsLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    const questionApiUrl = `https://jservice.io/api/random`;
    const numberOfQuestions = 5;
    axios
      .get(`${questionApiUrl}?count=${numberOfQuestions}`)
      .then((response) => {
        console.log('Data: ', response.data);
        setQuestionsData(response.data);
        setIsQuestionsLoaded(true);
      });
  }, []);

  return (
    <div className="App">
      <QuestionAndOptions questionsData={questionsData} />
    </div>
  );
}

export default App;
