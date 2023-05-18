/* eslint-disable react-hooks/exhaustive-deps */

import {
  IAnsweredData,
  IQuestionData
} from '../Interface/InterfaceDefinitions';
import { IResultStats } from '../Interface/InterfaceDefinitions';

interface IProp {
  answerProvided: IAnsweredData[];
  questionsData: IQuestionData[];
}

const Result = (props: IProp) => {
  let result = 0;
  let unattempted = 0;

  var heading = [
    'Q. No',
    'Your answer',
    'Correct Answer',
    'Time taken',
    'Status'
  ];
  const localStorageKey: string = 'quiz-results';

  // Logic to evaluate the results
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
            ? 'Correct'
            : 'Incorrect',
          answerSelected: isAnswered.answer,
          correctAnswer: question.answer
        };
      } else {
        unattempted++;
        return {
          id: questionId,
          timeTaken: 'NA',
          status: 'Unattempted',
          answerSelected: 'NA',
          correctAnswer: question.answer
        };
      }
    });

  // Logic to store results in local storage
  const localStorageItem: string | null =
    localStorage.getItem(localStorageKey);

  if (localStorageItem) {
    const storedResults: IResultStats[][] = JSON.parse(
      localStorageItem
    );
    storedResults.push(resultStats);
    localStorage.setItem(
      localStorageKey,
      JSON.stringify(storedResults)
    );
  } else {
    localStorage.setItem(
      localStorageKey,
      JSON.stringify([result])
    );
  }

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

      <table style={{ width: 1000 }}>
        <thead>
          <tr>
            {heading.map((head, headID) => (
              <th key={headID}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resultStats.map((rowContent, index) => (
            <TableRow
              rowContent={rowContent}
              questionNumber={index + 1}
              key={rowContent.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Result;

interface ITableProp {
  rowContent: IResultStats;
  questionNumber: number;
}

const TableRow = (props: ITableProp) => {
  const modifiedRow = [
    props.questionNumber,
    props.rowContent.answerSelected,
    props.rowContent.correctAnswer,
    props.rowContent.timeTaken,
    props.rowContent.status
  ];

  return (
    <tr>
      {modifiedRow.map((val, rowID) => (
        <td key={rowID}>{val}</td>
      ))}
    </tr>
  );
};
