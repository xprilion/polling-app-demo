import '@picocss/pico';
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";


function PollSelect() {

    const [availablePolls, setAvailablePolls] = useState([]);

    useEffect(() => {
        async function fetchPolls() {
            try {
                db.collection("polls").get().then((querySnapshot) => {
                    querySnapshot.forEach((poll) => {
                        setAvailablePolls(current => [...current, {id: poll.id, data: poll.data()}]);
                    })
                })
            } catch (err) {
                console.log(err);
            }
        }
        fetchPolls();
    }, []);


    return (
        <section className="container">
            {
                availablePolls.length == 0 ? (
                    <h4>Loading...</h4>
                ) : (
                    availablePolls.map((poll) => (
                        <a href={'/'+poll.id} key={poll.id}><button key="credit" className="outline">{poll.data.name}</button></a>
                    ))
                )             
            }
            
        </section>
    );
}

export default PollSelect;
