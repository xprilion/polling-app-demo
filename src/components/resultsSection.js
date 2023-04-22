import '@picocss/pico';
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";


function ResultDisplay(params) {

    const pollId = params?.pollId;

    const [pollData, setPollData] = useState([]);
    const [fetchedPollData, setFetchedPollData] = useState(false);

    useEffect(() => {
        async function fetchPollData() {
            try {
                
                db.collection("polls").doc(pollId).onSnapshot((doc) => {
                    setPollData(doc.data());
                    setFetchedPollData(true);
                })
            } catch (err) {
                console.log(err);
            }
        }
        fetchPollData();
    }, []);

    return (
        <section className="container">
            <h3>{pollData.name} &middot; <small><a href={"/"+pollId}>Poll</a></small></h3>
            <p>{pollData.description}</p>
            <hr />
            {
                fetchedPollData === false ? (
                    <h4>Loading...</h4>
                ) : (

                    pollData.choices && Object.entries(pollData.choices).map(([key, value]) => (
                        <>                        
                            {value.name}
                            <progress key={key} value={value.votes} max="100"></progress>
                        </>
                      ))

                )
            }

        </section>
    );
}

export default ResultDisplay;
