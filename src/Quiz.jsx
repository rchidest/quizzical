import React from 'react'
import QuestionAndAnswer from './QuestionAndAnswer'
import { nanoid } from 'nanoid'

export default function Questions(props) {
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([])
  const [checkAnswers, setCheckAnswers] = React.useState(false)
  const [correctAnswers, setCorrectAnswers] = React.useState(0)
  const [replay, setReplay] = React.useState(false)
  const [selectedAnswer, setSelectedAnswer] = React.useState('')

  React.useEffect(() => {
    if (!checkAnswers) {
      fetch('https://opentdb.com/api.php?amount=5').then((resp) =>
        resp.json().then((data) => {
          setQuestionsAndAnswers(
            data.results.map((qAndA) => generateQAndA(qAndA))
          )
        })
      )
    }
  }, [replay, checkAnswers])

  React.useEffect(() => {
    if (selectedAnswer) {
      const newQAndAs = questionsAndAnswers.map((qAndA) => {
        const newAnswers = qAndA.answers.map((answer) => {
          let newAnswer = {}
          const { id, qId, isSelected } = answer
          if (selectedAnswer === id) {
            console.log(
              `qId=${qId}  isSelected=${isSelected}  qAndA.id=${qAndA.id}`
            )
            newAnswer = { ...answer, isSelected: !isSelected }
          } else {
            newAnswer = { ...answer }
          }

          return newAnswer
        })
        qAndA.answers = newAnswers
        return { ...qAndA }
      })
      setQuestionsAndAnswers(newQAndAs)
    }
  }, [selectedAnswer])

  React.useEffect(() => {
    if (checkAnswers) {
      let numCorrectAnswers = 0
      questionsAndAnswers.forEach((qAndA) => {
        qAndA.answers.forEach((answer) => {
          if (answer.isSelected && answer.isAnswer) {
            numCorrectAnswers++
          }
        })
      })
      setCorrectAnswers(numCorrectAnswers)
    }
  }, [checkAnswers])

  function generateQAndA(qAndA) {
    const id = nanoid()
    return {
      id: id,
      question: qAndA.question,
      answers: generateAnswers(
        id,
        qAndA.correct_answer,
        qAndA.incorrect_answers
      ),
    }
  }
  function generateAnswers(qId, correct_answer, incorrect_answers) {
    const answers = []
    const id = nanoid()
    answers.push({
      qId: qId,
      id: id,
      answer: correct_answer,
      isAnswer: true,
      isSelected: false,
      selectAnswer: selectAnswer,
    })
    incorrect_answers.map((answer) => {
      const id = nanoid()
      answers.push({
        qId: qId,
        id: id,
        answer: answer,
        isAnswer: false,
        isSelected: false,
        selectAnswer: selectAnswer,
      })
    })
    return shuffle(answers)
  }
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }

    return array
  }

  function selectAnswer(id) {
    setSelectedAnswer(id)
  }
  function findAnswer(id) {
    let theAnswer = {}
    questionsAndAnswers.forEach((qAndA) => {
      qAndA.answers.forEach((answer) => {
        console.log(`answer.id=${answer.id}  id=${id}`)
        if (answer.id === id) {
          theAnswer = answer
        }
      })
    })
    console.log(`theAnswer.id=${theAnswer.id}`)
    return theAnswer
  }

  function getTheAnswers() {
    setCheckAnswers(true)
  }

  function playAgain() {
    setCheckAnswers(false)
    setReplay(true)
  }

  return (
    <div className='quiz'>
      <div>
        {questionsAndAnswers.length > 0 &&
          questionsAndAnswers.map((qAndA) => (
            <QuestionAndAnswer
              key={qAndA.id}
              quizData={qAndA}
              checkAnswers={checkAnswers}
            />
          ))}
      </div>
      {!checkAnswers ? (
        <button className='quiz-btn' onClick={getTheAnswers}>
          Check answers
        </button>
      ) : (
        <div className='play-again'>
          <h5 className='answer-score'>
            You scored {correctAnswers}/5 correct answers
          </h5>
          <button className='quiz-btn' onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </div>
  )
}
