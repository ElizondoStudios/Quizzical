import { nanoid } from "nanoid";
import React from "react";

function Question (props){
    
    function handleClick(event){
        props.changeAnswer(props.question, event.target.value, props.correct)
    }
    
    const buttons= props.options.map(e => 
        <button
         key={nanoid()}
         className={props.answer== e? "question--buttons--selected":"question--buttons--unselected"} 
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