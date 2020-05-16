import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const Event = () => {
  let output;
  let [events, setEvents] = useState([]);
  useEffect(() => {
    Axios.get('http://localhost:8080/event', {
      params: {
        token: sessionStorage.getItem('token')
      }
    })
      .then(data => {
        setEvents(data.data);
      })
      .catch(err => alert("login first"));
  }, []);



  return (

    <div className="container">
      {events.map((eve) => (
        <div className="card" >
          <div className="card-body">
            <h5 className="card-title"> {eve.title} </h5>
            <p className="card-text"> { eve.description } </p>
          </div>
        </div>
      ))}
      <h1> events works </h1>
    </div>
  );
};

export default Event
