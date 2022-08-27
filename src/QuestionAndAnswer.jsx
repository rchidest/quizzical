import { convert } from 'html-to-text'

export default function QuestionAndAnswer(props) {
  const { quizData, checkAnswers } = props

  function Answers(props) {
    const { answers } = props
    return (
      <div className='answers'>
        {answers.map((answer) => (
          <Answer key={answer.id} answer={answer} />
        ))}
      </div>
    )
  }
  function Answer(props) {
    const { answer } = props

    const selectedAnswerColor = '#D6DBF5'
    const unselectedAnswerColor = 'white'
    const correctAnswerColor = '#94D7A2'
    const wrongtAnswerColor = '#F8BCBC'

    let bgColor = unselectedAnswerColor
    if (checkAnswers) {
      if (answer.isAnswer) {
        bgColor = correctAnswerColor
      } else if (answer.isSelected) {
        bgColor = wrongtAnswerColor
      }
    } else {
      bgColor = answer.isSelected ? selectedAnswerColor : unselectedAnswerColor
    }
    const styles = {
      backgroundColor: bgColor,
    }

    return (
      <button
        className='answer'
        style={styles}
        onClick={() => answer.selectAnswer(answer.id)}
      >
        {convert(answer.answer)}
      </button>
    )
  }
  return (
    <div>
      <div className='question'>{convert(quizData.question)}</div>
      <Answers answers={quizData.answers} />
      <div className='line'></div>
    </div>
  )
}
