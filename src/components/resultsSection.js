import '@picocss/pico';
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";


function ResultDisplay(params) {

    const pollId = params?.pollId;

    const [pollData, setPollData] = useState([]);
    const [fetchedPollData, setFetchedPollData] = useState(false);
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        async function fetchPollData() {
            try {
                
                db.collection("polls").doc(pollId).onSnapshot((doc) => {
                    setPollData(doc.data());
                    const choices = doc.data().choices;
                    let votes = 0;
                    for (const choice in choices){
                        votes += choices[choice].votes;
                    }
                    setTotalVotes(votes);
                    setFetchedPollData(true);
                })
            } catch (err) {
                console.log(err);
            }
        }
        fetchPollData();
    }, [pollId]);

    return (
        <section className="container">
            <h3>{pollData.name} &middot; <small><a href={"/"+pollId}>Poll</a></small></h3>
            <p>{pollData.description}</p>
            <hr />
            {
                fetchedPollData === false ? (
                    <h4>Loading...</h4>
                ) : (
                    pollData.choices && Object.entries(pollData.choices).sort().map(([key, value]) => (
                        <>                        
                            {value.name} - {value.votes}
                            <progress key={key} value={(value.votes / totalVotes) * 100} max="100"></progress>
                        </>
                      ))
                )
            }
            <hr />
            Total votes: {totalVotes}
        </section>
    );
}

export default ResultDisplay;
