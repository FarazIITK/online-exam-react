/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { IQuestionData } from '../Interface/InterfaceDefinitions';

interface IProp {
  questionsData: IQuestionData[] | null;
  setIsQaVisible: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const QuestionAndAnswer = (props: IProp) => {
  const timerToDisplayQa = 10000;

  const qaHeading = `Quickly memorize the answers!`;

  // UseEffect to attach timer to display question-answer list
  useEffect(() => {
    setTimeout(() => {
      props.setIsQaVisible(false);
    }, timerToDisplayQa);
  }, []);

  return (
    <div className="question-answer">
      <h1>{qaHeading}</h1>
      {props.questionsData &&
        props.questionsData.map((questionData, index) => {
          return (
            <div
              key={questionData.id}
              className="question-box"
            >
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
