import { useEffect, useState } from 'react';
import './App.css';
import QuestionAndAnswer from './Components/QuestionAndAnswer';
import axios from 'axios';
import Questions from './Components/Questions';
import Result from './Components/Result';

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

  // State to store the user response
  const [answerProvided, setAnswerProvided] = useState<
    IAnsweredData[]
  >([]);

  // State to track whether to show the results page
  const [isResultVisible, setIsResultVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const questionApiUrl = `https://jservice.io/api/random`;
    const numberOfQuestions = 5;
    axios
      .get(`${questionApiUrl}?count=${numberOfQuestions}`)
      .then((response) => {
        setQuestionsData(response.data);
        setIsQuestionsLoaded(true);
      });
  }, []);

  return (
    <div className="App">
      {/* Loader for the API */}
      {!isQuestionsLoaded && (
        <h3>Loading Questions ... </h3>
      )}

      {/* Question-answer list component */}
      {isQuestionsLoaded && isQaVisible && (
        <QuestionAndAnswer
          questionsData={questionsData}
          setIsQaVisible={setIsQaVisible}
        />
      )}

      {/* Component for question and their options */}
      {isQuestionsLoaded &&
        !isQaVisible &&
        !isResultVisible && (
          <Questions
            questionsData={questionsData}
            answerProvided={answerProvided}
            setAnswerProvided={setAnswerProvided}
            isResultVisible={isResultVisible}
            setIsResultVisible={setIsResultVisible}
          />
        )}

      {/* Component to display results */}
      {isResultVisible && (
        <Result
          answerProvided={answerProvided}
          questionsData={questionsData}
        />
      )}
    </div>
  );
}

export default App;
