/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { IQuestionData, IAnsweredData } from '../App';
import QuestionOptions from './QuestionOptions';

interface IProp {
  questionsData: IQuestionData[];
  answerProvided: IAnsweredData[];
  setAnswerProvided: React.Dispatch<
    React.SetStateAction<IAnsweredData[]>
  >;
  isResultVisible: boolean;
  setIsResultVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Questions = (props: IProp) => {
  const timeCompletedAlertMessage = `Sorry! Time Over`;
  const timePerQuestion = 20;

  // State to track the current question
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    useState<number>(0);

  // State to keep track of remaining time
  const [remainingTime, setRemainingTime] =
    useState(timePerQuestion);

  // Handler for next button
  // If we are on last question, then  set isResultVisible to true otherwise simply increment the current question
  const handleNextQuestion = () => {
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

  // Handler to store the selected result
  const handleOptionSelect = (
    questionId: number,
    answer: string,
    correctAnswer: string
  ) => {
    props.setAnswerProvided((prevAnswers) => {
      const newAnswer: IAnsweredData = {
        questionId: questionId,
        answer: answer,
        timeTaken: timePerQuestion - remainingTime,
        correct: answer === correctAnswer
      };
      // If we are selecting an option for the first time, then we can simply append the results to the answer array
      if (prevAnswers.length - 1 !== currentQuestionIndex) {
        return [...prevAnswers, newAnswer];
      }

      // If we are selecting a different option for the same question, then we've replace the previous result with the new results
      const copiedPrevAnswers = [...prevAnswers];
      if (copiedPrevAnswers.length === 0) {
        return [newAnswer];
      } else {
        copiedPrevAnswers.pop();
        return [...copiedPrevAnswers, newAnswer];
      }
    });
  };

  // To set timer for the question
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  // UseEffect to keep track to remaining time for each question
  // If remaining time is zero, then show alert and move to next question
  useEffect(() => {
    if (remainingTime === 0) {
      handleNextQuestion();
      alert(timeCompletedAlertMessage);
    }
  }, [remainingTime]);

  return (
    <div>
      <h3>Remaining time: {remainingTime}</h3>
      <QuestionOptions
        currentQuestionIndex={currentQuestionIndex}
        questionsData={props.questionsData}
        handleOptionSelect={handleOptionSelect}
        setAnswerProvided={props.setAnswerProvided}
      />

      <button onClick={handleNextQuestion}>Next</button>
    </div>
  );
};

export default Questions;
