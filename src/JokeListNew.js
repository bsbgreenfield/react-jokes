import React, { useEffect, useState } from "react";
import JokeNew from "./JokeNew";
import axios from "axios";
import "./JokeList.css";

function JokeListNew({numJokes = 5}) {
    const [jokes, setJokes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);


    const vote = (id, num) => {
        let updatedJokes = [...jokes]
        let idx = updatedJokes.findIndex(joke => joke.id === id)
        updatedJokes[idx].votes += num
        console.log("updating jokes!!!!!")
        setJokes(updatedJokes)

    }

    const getJokes = () => {
        setIsLoading(true)
        setJokes([])
    }

    useEffect(() => {
        async function callAxios() {
            const seenJokes = new Set()
            const jokeToLoad = [...jokes]

            while (jokeToLoad.length < numJokes) {
                let resp = await axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                })
                let { ...joke } = resp.data
    
                if (!(seenJokes.has(joke.id))) {
                    seenJokes.add(joke.id)
                    jokeToLoad.push({ ...joke, votes: 0 })
                }
                else { console.log("duplicate!!") }
            }
            setJokes(jokeToLoad)
            setIsLoading(false)
           
        }
        if (jokes.length === 0) callAxios()
    }, [jokes, numJokes])
    

    if (isLoading === true) {
        return (
            <div className="loading">
                <i className="fas fa-4x fa-spinner fa-spin" />
            </div>
        )
    }
    return (
        <>
            {sortedJokes.map(j => <JokeNew
                text={j.joke}
                key={j.id}
                id={j.id}
                votes={j.votes}
                vote={vote} />)}

            <button onClick={getJokes}>Reload Jokes</button>
        </>

    )
}

export default JokeListNew