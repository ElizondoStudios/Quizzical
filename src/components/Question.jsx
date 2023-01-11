import { nanoid } from "nanoid";
import React from "react";

function Question (props){
    let answerStyle= "question--buttons--unselected"
    
    function handleClick(event){
        props.changeAnswer(props.question, event.target.value, props.correct)
    }

    function chooseStyle(e){
        if(props.gameOver){
            if(props.correct===e){
                answerStyle= "question--buttons--correct"
            }else if(props.answer===e && props.answer!=props.correct){
                answerStyle= "question--buttons--incorrect"
            }else{
                answerStyle= "question--buttons--unselected"
            }
        }else{
            props.answer===e?
            answerStyle= "question--buttons--selected":
            answerStyle= "question--buttons--unselected"
        }
        return true
    }

    const buttons= props.options.map(e => 
        <button
         key={nanoid()}
         className={chooseStyle(e) && answerStyle} 
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