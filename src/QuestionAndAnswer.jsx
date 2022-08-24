import { convert } from "html-to-text";

export default function QuestionAndAnswer(props) {
  const { quizData } = props;

  function Answers(props) {
    return (
      <div className="answers">
        {props.answers.map((answer) => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </div>
    );
  }
  function Answer(props) {
    const answer = props.answer;
    const styles = {
      backgroundColor: answer.isSelected ? "#D6DBF5" : "white",
    };

    return (
      <button
        className="answer"
        style={styles}
        onClick={() => answer.selectAnswer(answer.id)}
      >
        {convert(answer.answer)}
      </button>
    );
  }
  return (
    <div>
      <div className="question">{convert(quizData.question)}</div>
      <Answers answers={quizData.answers} />
      <div className="line"></div>
    </div>
  );
}
