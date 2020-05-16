import React, { useState } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const Signup = (props) => {
  let [user, setUser] = useState({
    name: "",
    userName: "",
    password: "",
    password1: "",
  });

  const updateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const printValues = e => {
    e.preventDefault();
    axios.post('http://localhost:8080/register', user)
      .then(data => {
        sessionStorage.setItem("token", data.data.token);
        props.history.push("/");
      })
      .catch(err => alert(err))
  };

  return (
    <form onSubmit={printValues} className="container">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input value={user.name} onChange={updateField} type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" placeholder="name" />
      </div>
      <div className="form-group">
        <label htmlFor="uName">Username</label>
        <input value={user.username} onChange={updateField} type="text" className="form-control" id="uName" name="userName" aria-describedby="emailHelp" placeholder="unique user name" />
      </div>
      <div className="form-group">
        <label htmlFor="pass1">Password</label>
        <input value={user.username} onChange={updateField} type="password" className="form-control" id="pass1" name="password" placeholder="password" />
      </div>
      <div className="form-group">
        <label htmlFor="pass2">Password 2</label>
        <input value={user.username} onChange={updateField} type="password" className="form-control" id="pass2" name="password1" placeholder="password verification" />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup
