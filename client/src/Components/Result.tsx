/* eslint-disable react-hooks/exhaustive-deps */

import { IAnsweredData } from '../App';

interface IProp {
  answerProvided: IAnsweredData[];
}

const Result = (props: IProp) => {
  let result = 0;
  props.answerProvided.forEach((answer) => {
    if (answer.correct) {
      result++;
    }
  });
  return (
    <div>
      <h2>Result:</h2>
      <p>
        {(result / props.answerProvided.length) * 100} %
      </p>
    </div>
  );
};

export default Result;
