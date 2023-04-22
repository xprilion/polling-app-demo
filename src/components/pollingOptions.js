import '@picocss/pico';
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";


function PollingOptions(params) {

    const pollId = params?.pollId;

    const [pollData, setPollData] = useState([]);
    const [fetchedPollData, setFetchedPollData] = useState(false);

    function performVote(choiceId) {
        var docRef = db.collection('polls').doc(pollId);
        docRef.update({
            ["choices."+choiceId+".votes"]: firebase.firestore.FieldValue.increment(1)
        });
    }

    useEffect(() => {
        async function fetchPollData() {
            try {
                db.collection("polls").doc(pollId).get().then((doc) => {
                    setPollData(doc.data());
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
            <h3>{pollData.name} &middot; <small><a href={"/"+pollId+"/results"}>Results</a></small></h3>
            <p>{pollData.description}</p>
            <hr />
            { fetchedPollData === false ? (
                    <h4>Loading...</h4>
                ) : (
                    pollData.choices && Object.entries(pollData.choices).map(([key, value]) => (
                        <button onClick={() => {performVote(key)}} key={key}>{value.name}</button>
                      ))
                )
            }

        </section>
    );
}

export default PollingOptions;
