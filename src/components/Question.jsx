import { nanoid } from "nanoid";
import React from "react";

function Question (props){
    const [answer, setAnswer]= React.useState("")
    
    function handleClick(event){
        setAnswer(event.target.value)
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
    
    const [questions, setQuestions]= React.useState(shuffleArray([props.correct, ...props.incorrect]))

    const buttons= questions.map(e => 
        <button
         key={nanoid()}
         className={answer== e? "question--buttons--selected":"question--buttons--unselected"} 
         value={e}
         onClick={handleClick}
        >
            {e.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&ldquo;","“").replaceAll("&rdquo;", "”")}
        </button>
        )

    return(
        <div className="question">
            <h2>{props.question.replaceAll("&#039;", "'").replaceAll("&quot;", '"').replaceAll("&ldquo;","“").replaceAll("&rdquo;", "”")}</h2>
            <div className="question--buttons">
                {buttons}
            </div>
        </div>
    )
}

export default Question