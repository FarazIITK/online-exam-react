/* eslint-disable react-hooks/exhaustive-deps */

import { IQuestionData, IAnsweredData } from '../App';

interface IProp {
  currentQuestionIndex: number;
  questionsData: IQuestionData[];
  handleOptionSelect: (
    questionId: number,
    answer: string,
    correctAnswer: string
  ) => void;
  setAnswerPzrovided: React.Dispatch<
    React.SetStateAction<IAnsweredData[]>
  >;
}

const QuestionOptions = (props: IProp) => {
  return (
    <div>
      {props.questionsData.map((question) => (
        <li key={question.id}>
          <input
            type="radio"
            value={question.answer}
            name="answers"
            // checked={true}
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
