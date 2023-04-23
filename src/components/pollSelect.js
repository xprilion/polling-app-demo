import '@picocss/pico';
import { useState, useEffect } from 'react';
import { db } from "../firebase/firebase";


function PollSelect() {

    const [availablePolls, setAvailablePolls] = useState([]);

    useEffect(() => {
        async function fetchPolls() {
            try {
                db.collection("polls").onSnapshot((polls) => {
                    setAvailablePolls([]);
                    polls.forEach((poll) => {
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
                availablePolls.length === 0 ? (
                    <h4>Loading...</h4>
                ) : (
                    availablePolls.map((poll) => (
                        <a href={ poll.data.active === true ? '/'+poll.id : 'javascript: alert("Poll not started or has ended.");'} key={poll.id}><button className="outline">{poll.data.name}</button></a>
                    ))
                )             
            }
            
        </section>
    );
}

export default PollSelect;
