/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from 'react';
import { IQuestionData, IAnsweredData } from '../App';

interface IProp {
  questionsData: IQuestionData[];
  answerProvided: IAnsweredData[];
  setAnswerPzrovided: React.Dispatch<
    React.SetStateAction<IAnsweredData[]>
  >;
  isResultVisible: boolean;
  setIsResultVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Questions = (props: IProp) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(0);

  const handleAnswerSelection = (
    questionId: number,
    answer: string,
    correctAnswer: string
  ) => {
    props.setAnswerPzrovided((prevAnswers) => {
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
      props.setIsResultVisible(true);
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
