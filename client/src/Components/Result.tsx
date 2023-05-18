/* eslint-disable react-hooks/exhaustive-deps */

import { IAnsweredData, IQuestionData } from '../App';

interface IProp {
  answerProvided: IAnsweredData[];
  questionsData: IQuestionData[];
}

interface IResultStats {
  id: number;
  timeTaken: number | string;
  status: 'correct' | 'incorrect' | 'unattempted';
  answerSelected: string;
  correctAnswer: string;
}

const Result = (props: IProp) => {
  let result = 0;
  let unattempted = 0;

  const resultStats: IResultStats[] =
    props.questionsData.map((question) => {
      const { id: questionId } = question;
      const isAnswered = props.answerProvided.find(
        (answer) => answer.questionId === questionId
      );
      if (isAnswered) {
        if (isAnswered.correct) {
          result++;
        }
        return {
          id: questionId,
          timeTaken: isAnswered.timeTaken,
          status: isAnswered.correct
            ? 'correct'
            : 'incorrect',
          answerSelected: isAnswered.answer,
          correctAnswer: question.answer
        };
      } else {
        unattempted++;
        return {
          id: questionId,
          timeTaken: 'NA',
          status: 'unattempted',
          answerSelected: 'NA',
          correctAnswer: question.answer
        };
      }
    });

  return (
    <div>
      <h2>Total Questions: {props.questionsData.length}</h2>
      <h2>Correct: {result}</h2>
      <h2>Unattempted: {unattempted}</h2>
      <h2>
        Incorrect:{' '}
        {props.questionsData.length - result - unattempted}
      </h2>
      <h2>
        Final Result:{' '}
        {(result / props.questionsData.length) * 100} %
      </h2>

      <p>{(result / props.questionsData.length) * 100} %</p>
      {resultStats.map((result, index) => {
        return (
          <div key={result.id}>
            <p>
              <b>Question {index + 1}:</b>{' '}
            </p>
            <p>Your Answer: {result.answerSelected}</p>
            <p>Correct Answer: {result.correctAnswer}</p>
            <p>Time Taken: {result.timeTaken}</p>
            <p>Status: {result.status}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Result;
