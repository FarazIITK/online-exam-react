/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { IQuestionData } from '../App';

interface IProp {
  questionsData: IQuestionData[] | null;
  setIsQaVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const QuestionAndAnswer = (props: IProp) => {
  useEffect(() => {
    setTimeout(() => {
      props.setIsQaVisible(false);
    }, 4000);
  }, []);

  return (
    <div>
      <h1>Question</h1>
    </div>
  );
};

export default QuestionAndAnswer;
