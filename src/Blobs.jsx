export default function Blobs(props) {
  return (
    <div>
      <div
        className={props.activeQuiz ? "blobs-right-game" : "blobs-right-intro"}
      >
        <div className="blob-top-right"></div>
      </div>
      <div
        className={props.activeQuiz ? "blobs-left-game" : "blobs-left-intro"}
      >
        <div className="blob-bot-left"></div>
      </div>
    </div>
  );
}
