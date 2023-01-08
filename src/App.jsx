import React from "react"
import Question from "./components/Question"
import TitleScreen from "./components/TitleScreen"
import { nanoid } from "nanoid"

// import { data } from "./data"


function App() {
  const [gameStart, setGameStart]= React.useState(false)
  const [questions, setQuestions]= React.useState([])

  function toggleStart(){
    setGameStart(prevGameStart => !prevGameStart)
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
      incorrect={e.incorrect_answers}
      key={nanoid()}
      />
    )

  return (
    <div className="App">
      {gameStart? 
        <div className="App--questions">
          {questionElements}
          <button className="UI--button">Check answers</button>
        </div>
       :<TitleScreen toggleStart={toggleStart}/>}
    </div>
  )
}

export default App
