/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from 'react';
import { IQuestionData } from '../App';

interface IProp {
  questionsData: IQuestionData[];
}

interface IAnsweredData {
  questionId: number;
  answer: string;
  timeTaken: number;
  correct: boolean;
}

const Questions = (props: IProp) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(0);
  const [answerProvided, setAnswerPzrovided] = useState<
    IAnsweredData[]
  >([]);
  const [isResultVisible, setIsResultVisible] =
    useState<boolean>(false);

  const handleAnswerSelection = (
    questionId: number,
    answer: string,
    correctAnswer: string
  ) => {
    setAnswerPzrovided((prevAnswers) => {
      const newAnswer: IAnsweredData = {
        questionId: questionId,
        answer: answer,
        timeTaken: 10,
        correct: answer === correctAnswer
      };
      return [...prevAnswers, newAnswer];
    });
    moveToNextQuestion();
  };

  const moveToNextQuestion = () => {
    if (
      currentQuestionIndex <
      props.questionsData.length - 1
    ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsResultVisible(true);
    }
  };

  return (
    <div>
      <h2>Question:</h2>
      <p>
        {props.questionsData[currentQuestionIndex].question}
      </p>
      <h2>Answer options:</h2>
      <ul>
        {props.questionsData.map((question) => (
          <li key={question.id}>
            <button
              onClick={() =>
                handleAnswerSelection(
                  props.questionsData[currentQuestionIndex]
                    .id,
                  question.answer,
                  props.questionsData[currentQuestionIndex]
                    .answer
                )
              }
            >
              {question.answer}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
