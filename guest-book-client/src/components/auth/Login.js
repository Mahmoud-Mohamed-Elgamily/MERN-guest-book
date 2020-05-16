import React, { useState } from 'react'
import Axios from 'axios';

const Login = (props) => {
  let [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const updateField = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const printValues = e => {
    e.preventDefault();
    Axios.post('http://localhost:8080/login', user)
      .then(data => {
        sessionStorage.setItem("token",data.data.token);
        props.history.push("/");
      })
      .catch(err => alert(err))
  };

  return (
    <form onSubmit={printValues} className="container">
      <div className="form-group">
        <label htmlFor="uName">Username</label>
        <input value={user.username} onChange={updateField} type="text" className="form-control" id="uName" name="userName" aria-describedby="emailHelp" placeholder="unique user name" />
      </div>
      <div className="form-group">
        <label htmlFor="pass1">Password</label>
        <input value={user.username} onChange={updateField} type="password" className="form-control" id="pass1" name="password" placeholder="password" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Login
