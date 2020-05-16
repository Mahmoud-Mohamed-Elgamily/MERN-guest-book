import React, { useState, useEffect } from 'react';
import Axios from 'axios';


const Event = () => {
  let [events, setEvents] = useState({});
  var allEvents;
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
  });

  return (
    <div className="container">
      {allEvents}
      <h1> events works </h1>
    </div>
  );
};

export default Event
