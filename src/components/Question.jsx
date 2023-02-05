import { nanoid } from "nanoid";
import React from "react";
import { htmlEntities } from "../htmlEntities";

function Question (props){
    let answerStyle= "question--buttons--unselected"
    
    function handleClick(event){
        props.changeAnswer(props.question, event.target.value, props.correct)
    }


    function chooseStyle(e){
        if(props.gameOver){
            if(props.correct===e){
                answerStyle= "question--buttons--button correct"
            }else if(props.answer===e && props.answer!=props.correct){
                answerStyle= "question--buttons--button incorrect"
            }else{
                answerStyle= "question--buttons--button unselected"
            }
        }else{
            props.answer===e?
            answerStyle= "question--buttons--button selected":
            answerStyle= "question--buttons--button unselected"
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
            {htmlEntities(e)}
        </button>
        )

    return(
        <div className="question">
            <h2>{htmlEntities(props.question)}</h2>
            <div className="question--buttons">
                {buttons}
            </div>
        </div>
    )
}

export default Question