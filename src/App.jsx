import React from "react";
import Intro from "./Intro";
import Blobs from "./Blobs";
import Quiz from "./Quiz";

export default function App() {
  const [activeQuiz, setActiveQuiz] = React.useState(false);

  function startQuiz() {
    setActiveQuiz(true);
  }
  return (
    <main className="main">
      <Blobs activeQuiz={activeQuiz} />
      {activeQuiz ? <Quiz /> : <Intro startQuiz={startQuiz} />}
    </main>
  );
}
