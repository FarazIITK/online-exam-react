/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
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

  const timePerQuestion = 20;

  const moveToNextQuestion = () => {
    if (
      currentQuestionIndex <
      props.questionsData.length - 1
    ) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      props.setIsResultVisible(true);
    }
    setRemainingTime(timePerQuestion);
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
        timeTaken: timePerQuestion - remainingTime,
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
  };

  const [remainingTime, setRemainingTime] =
    useState(timePerQuestion);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (remainingTime === 0) {
      moveToNextQuestion();
      alert('Time completed');
    }
  }, [remainingTime]);

  return (
    <div>
      <h3>Time Passed: {remainingTime}</h3>
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
