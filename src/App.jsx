import React from "react"
import Question from "./components/Question"
import TitleScreen from "./components/TitleScreen"
import { nanoid } from "nanoid"

// import { data } from "./data"


function App() {
  const [gameStart, setGameStart]= React.useState(false)
  const [questions, setQuestions]= React.useState([])
  const [gameOver, setGameOver]= React.useState(false)
  const [answers, setAnswer]= React.useState([])

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
    setAnswer(prevAnswer =>{
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

  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(data => setQuestions(data.results))
  },[])


  const questionElements= questions.map(e =>
      <Question 
       question={e.question} 
       correct={e.correct_answer}
       options={shuffleArray([...e.incorrect_answers, e.correct_answer])}
       key={nanoid()}
       answer={findAnswer(e.question)}
       changeAnswer={changeAnswer}
       />
  )


  return (
    <div className="App">
      {gameStart? 
        <div className="App--questions">
          {questionElements}
          <button className="UI--button" onClick={toggleGameOver}>Check answers</button>
        </div>
       :<TitleScreen toggleStart={toggleStart}/>}
    </div>
  )
}

export default App
