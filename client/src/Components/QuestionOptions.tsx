/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from 'react';
import { IQuestionData, IAnsweredData } from '../App';

interface IProp {
  currentQuestionIndex: number;
  questionsData: IQuestionData[];
  handleOptionSelect: (
    questionId: number,
    answer: string,
    correctAnswer: string
  ) => void;
  setAnswerProvided: React.Dispatch<
    React.SetStateAction<IAnsweredData[]>
  >;
}

const QuestionOptions = (props: IProp) => {
  // Handler to shuffle the answer options
  function shuffle(array: IQuestionData[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(
        Math.random() * currentIndex
      );
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex]
      ];
    }

    return array;
  }

  const [shuffledArray, setShuffledArray] = useState<
    IQuestionData[]
  >([...props.questionsData]);

  useEffect(() => {
    setShuffledArray(shuffle([...props.questionsData]));
  }, [props.currentQuestionIndex]);

  return (
    <div>
      <h2>Question: {props.currentQuestionIndex + 1}</h2>
      <p>
        {
          props.questionsData[props.currentQuestionIndex]
            .question
        }
      </p>
      <h2>Answer options:</h2>
      {shuffledArray.map((question, index) => (
        <li
          key={`${props.currentQuestionIndex + 1},${index}`}
        >
          <input
            type="radio"
            value={question.answer}
            name={
              props.questionsData[
                props.currentQuestionIndex
              ].question
            }
            onChange={() =>
              props.handleOptionSelect(
                props.questionsData[
                  props.currentQuestionIndex
                ].id,
                question.answer,
                props.questionsData[
                  props.currentQuestionIndex
                ].answer
              )
            }
          />{' '}
          {question.answer}
        </li>
      ))}
    </div>
  );
};

export default QuestionOptions;
