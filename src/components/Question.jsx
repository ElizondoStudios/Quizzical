import { nanoid } from "nanoid";
import React from "react";

function Question (props){
    const answer= React.useRef("")

    const[rerender, setrerender]= React.useState(true);

    function handleClick(event){
        answer.current=event.target.value
        setrerender(prevRerender => !prevRerender)
    }

    const questions= [props.correct, ...props.incorrect]

    const buttons= questions.map(e => 
        <button
         key={nanoid()}
         className={answer.current== e?"question--buttons--selected":"question--buttons--unselected"} 
         value={e}
         onClick={handleClick}
        >
            {e.replaceAll("&#039;", "'").replaceAll("&quot;", '"')}
        </button>
        )

    return(
        <div className="question">
            <h2>{props.question.replaceAll("&#039;", "'").replaceAll("&quot;", '"')}</h2>
            <div className="question--buttons">
                {buttons}
            </div>
        </div>
    )
}

export default Question