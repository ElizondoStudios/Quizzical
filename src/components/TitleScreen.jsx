function TitleScreen (props){
    return (
        <div className="title-screen">
            <h1>Quizzical</h1>
            <h3>Test your general knowledge</h3>
            <button onClick={props.toggleStart}>Start quizz</button>
        </div>
    )
}

export default TitleScreen