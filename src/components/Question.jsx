import React from "react";

function Question (props){
    function handleClick(event){
        event.target.className=="question--buttons--selected"?
        event.target.className="question--buttons--unselected":
        event.target.className="question--buttons--selected"
    }

    // function shuffleArray(array){
    //     for (let i = array.length - 1; i > 0; i--) {
    //       const j = Math.floor(Math.random() * (i + 1));
    //       const temp = array[i];
    //       array[i] = array[j];
    //       array[j] = temp;
    //     }
    // }

    const questions= [props.correct, ...props.incorrect]

    const buttons= questions.map(e => 
        <button
                 className="question--buttons--unselected"
                 onClick={handleClick}
                 value={props.correct}
                >{e}</button>
        )

    return(
        <div className="question">
            <h2>{props.question}</h2>
            <div className="question--buttons">
                {buttons}
                <label className="question--buttons--unselected">
                    <input type="radio"/>
                    Hola
                </label>
            </div>
        </div>
    )
}

export default Question