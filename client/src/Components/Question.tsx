import { useEffect, useState } from 'react';
import axios from 'axios';
import { IQuestionData } from '../App';

interface IProp {
  questionsData: IQuestionData[] | null;
  setQuestionsData: React.Dispatch<
    React.SetStateAction<IQuestionData[] | null>
  >;
}

const QuestionAndOptions = (props: IProp) => {
  const questionApiUrl = `https://jservice.io/api/random`;
  const numberOfQuestions = 5;

  useEffect(() => {
    axios
      .get(`${questionApiUrl}?count=${numberOfQuestions}`)
      .then((response) => {
        console.log('Data: ', response.data);
        props.setQuestionsData(response.data);
      });
  }, []);

  return (
    <div>
      <h1>Question</h1>
    </div>
  );
};

export default QuestionAndOptions;
