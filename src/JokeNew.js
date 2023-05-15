import React from "react";
import "./Joke.css"

function JokeNew({text, id, votes, vote}){

    return(
        <div className="Joke">
        <div className="Joke-votearea">
          <button onClick={e => vote(id, +1)}>
            <i className="fas fa-thumbs-up" />
          </button>

          <button onClick={e => vote(id, -1)}>
            <i className="fas fa-thumbs-down" />
          </button>
          {votes}
        </div>

        <div className="Joke-text">{text}</div>
      </div>
    )
}

export default JokeNew