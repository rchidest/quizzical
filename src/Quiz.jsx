import React from "react";
import QuestionAndAnswer from "./QuestionAndAnswer";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);
  const [checkAnswers, setCheckAnswers] = React.useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = React.useState(0);
  const [replay, setReplay] = React.useState(false);
  const [selectedAnswer, setSelectedAnswer] = React.useState("");

  React.useEffect(() => {
    if (!checkAnswers) {
      fetch("https://opentdb.com/api.php?amount=5").then((resp) =>
        resp.json().then((data) => {
          setQuestionsAndAnswers(
            data.results.map((qAndA) => generateQAndA(qAndA))
          );
        })
      );
    }
  }, [replay, checkAnswers]);

  React.useEffect(() => {
    if (selectedAnswer) {
      const newQAndAs = questionsAndAnswers.map((qAndA) => {
        const newAnswers = qAndA.answers.map((answer) => {
          const newAnswer =
            selectedAnswer === answer.id
              ? { ...answer, isSelected: !answer.isSelected }
              : { ...answer, isSelected: false };
          return newAnswer;
        });
        qAndA.answers = newAnswers;
        return { ...qAndA };
      });
      setQuestionsAndAnswers(newQAndAs);
    }
  }, [selectedAnswer]);

  function generateQAndA(qAndA) {
    return {
      id: nanoid(),
      question: qAndA.question,
      answers: generateAnswers(qAndA.correct_answer, qAndA.incorrect_answers),
    };
  }
  function generateAnswers(correct_answer, incorrect_answers) {
    const answers = [];
    const id = nanoid();
    answers.push({
      id: id,
      answer: correct_answer,
      isAnswer: true,
      isSelected: false,
      selectAnswer: selectAnswer,
    });
    incorrect_answers.map((answer) => {
      const id = nanoid();
      answers.push({
        id: id,
        answer: answer,
        isAnswer: false,
        isSelected: false,
        selectAnswer: selectAnswer,
      });
    });
    return shuffle(answers);
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function selectAnswer(id) {
    setSelectedAnswer(id);
  }

  function getTheAnswers() {
    setCheckAnswers(true);
  }

  function playAgain() {
    setCheckAnswers(false);
    setReplay(true);
  }

  return (
    <div className="quiz">
      <div>
        {questionsAndAnswers.length > 0 &&
          questionsAndAnswers.map((qAndA) => (
            <QuestionAndAnswer key={qAndA.id} quizData={qAndA} />
          ))}
      </div>
      {!checkAnswers ? (
        <button className="quiz-btn" onClick={getTheAnswers}>
          Check answers
        </button>
      ) : (
        <div className="play-again">
          <h5 className="answer-score">
            You scored {showCorrectAnswers}/5 correct answers
          </h5>
          <button className="quiz-btn" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  );
}
