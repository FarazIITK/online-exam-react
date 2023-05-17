/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from 'react';
import { IQuestionData, IAnsweredData } from '../App';
import QuestionOptions from './QuestionOptions';

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

  const handleOptionSelect = (
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
      if (prevAnswers.length - 1 !== currentQuestionIndex) {
        return [...prevAnswers, newAnswer];
      }

      const copiedPrevAnswers = [...prevAnswers];
      if (copiedPrevAnswers.length === 0) {
        return [newAnswer];
      } else {
        copiedPrevAnswers.pop();
        return [...copiedPrevAnswers, newAnswer];
      }
    });
    // moveToNextQuestion();
  };

  return (
    <div>
      <QuestionOptions
        currentQuestionIndex={currentQuestionIndex}
        questionsData={props.questionsData}
        handleOptionSelect={handleOptionSelect}
        setAnswerPzrovided={props.setAnswerPzrovided}
      />

      <button onClick={moveToNextQuestion}>Next</button>
    </div>
  );
};

export default Questions;
