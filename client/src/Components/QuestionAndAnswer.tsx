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
    }, 40000);
  }, []);

  return (
    <div>
      <h1>Quickly memorize the answers!</h1>
      {props.questionsData &&
        props.questionsData.map((questionData, index) => {
          return (
            <div key={questionData.id}>
              <p>
                <b>Question {index + 1}:</b>{' '}
                {questionData.question}
              </p>
              <p>
                <b>Answer:</b> {questionData.answer}
              </p>
            </div>
          );
        })}
    </div>
  );
};

export default QuestionAndAnswer;
