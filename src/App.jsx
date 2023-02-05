import React from "react"
import Question from "./components/Question"
import TitleScreen from "./components/TitleScreen"
import Confetti from 'react-confetti'
import { nanoid } from "nanoid"


function App() {
  const [gameStart, setGameStart]= React.useState(false)
  const [questions, setQuestions]= React.useState([])
  const [gameOver, setGameOver]= React.useState(false)
  const [answers, setAnswers]= React.useState([])
  const [numGames, setNumGames]= React.useState([1])

  const shffldAns= React.useRef([])
  const score= React.useRef(0);

  function toggleStart(){
    setGameStart(prevGameStart => !prevGameStart)
  }

  function toggleGameOver(){
    setGameOver(prevGameOver => !prevGameOver)
  }

  function findAnswer(question){
    if(!answers)
      return ""
    for(let i= answers.length-1; i>=0; i--){
      if(answers[i].question===question){
        return answers[i].answer
      }
    }
    return ""
  }

  function changeAnswer(question, answer, correct){
    setAnswers(prevAnswer =>{
      if(!prevAnswer)
        return [{question: question, answer: answer, correct: correct}]
      if(prevAnswer.some(e => e.question===question))
        return prevAnswer.map(e => e.question===question? {...e, answer: answer}: e)
      return [...prevAnswer, {question: question, answer: answer, correct: correct}]
    })
  }

  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

  function scorePoints(){
    for (let i=answers.length-1; i>=0; i--){
      if(answers[i])
        if(answers[i].answer===answers[i].correct)
          score.current= score.current+1
    }

    return true
  }

  function resetGame(){
    score.current=0;
    setAnswers([])
    setNumGames(prevNumGames => prevNumGames+1)
    toggleGameOver()
  }

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
            .then(res => res.json())
            .then(data => {
              data.results.forEach(e => 
                {shffldAns.current= [...shffldAns.current, shuffleArray([e.correct_answer, ...e.incorrect_answers])]})
                return data
            })
            .then(data => setQuestions(data.results))
  },[numGames])


  const questionElements= questions.map((e, indx) =>
      <Question 
       question={e.question} 
       correct={e.correct_answer}
       options={shffldAns.current[shffldAns.current.length-5+indx]}
       key={nanoid()}
       answer={findAnswer(e.question)}
       changeAnswer={changeAnswer}
       gameOver={gameOver}
       />
  )


  return (
    <div className="App">
      {score.current>=5 && <Confetti/>}
      {gameStart? 
        <div className="App--questions">
          {questionElements}
          <div className="App--questions--UI">
            {gameOver && <h2>You scored {scorePoints() && (score.current)}/5 correct answers</h2>}
            <button className="UI--button" onClick={()=>(gameOver? resetGame(): toggleGameOver())}>{gameOver?"Play again":"Check answers"}</button>
          </div>
        </div>
       :<TitleScreen toggleStart={toggleStart}/>}
    </div>
  )
}

export default App
