import { IQuestionData } from '../App';

interface IProp {
  questionsData: IQuestionData[] | null;
}

const QuestionAndAnswer = (props: IProp) => {
  return (
    <div>
      <h1>Question</h1>
    </div>
  );
};

export default QuestionAndAnswer;
