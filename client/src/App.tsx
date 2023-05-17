import { useEffect, useState } from 'react';
import './App.css';
import QuestionAndAnswer from './Components/QuestionAndAnswer';
import axios from 'axios';
import Questions from './Components/Questions';

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

function App() {
  // State to store data from the API response
  const [questionsData, setQuestionsData] = useState<
    IQuestionData[]
  >([]);
  // State to handle whether the questions data is loaded
  const [isQuestionsLoaded, setIsQuestionsLoaded] =
    useState<boolean>(false);

  // State to track whether to show question-answers list
  const [isQaVisible, setIsQaVisible] =
    useState<boolean>(true);

  const [answerProvided, setAnswerPzrovided] = useState<
    IAnsweredData[]
  >([]);
  const [isResultVisible, setIsResultVisible] =
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
      {!isQuestionsLoaded && (
        <h3>Loading Questions ... </h3>
      )}
      {isQuestionsLoaded && isQaVisible && (
        <QuestionAndAnswer
          questionsData={questionsData}
          setIsQaVisible={setIsQaVisible}
        />
      )}
      {isQuestionsLoaded &&
        !isQaVisible &&
        !isResultVisible && (
          <Questions
            questionsData={questionsData}
            answerProvided={answerProvided}
            setAnswerPzrovided={setAnswerPzrovided}
            isResultVisible={isResultVisible}
            setIsResultVisible={setIsResultVisible}
          />
        )}
    </div>
  );
}

export default App;
