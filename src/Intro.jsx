export default function Intro(props) {
  return (
    <div className="intro">
      <h1 className="title">Quizzical</h1>
      <h4 className="descr">Some description about the app</h4>
      <button className="start-quiz-btn" onClick={props.startQuiz}>
        Start Quiz
      </button>
    </div>
  );
}
