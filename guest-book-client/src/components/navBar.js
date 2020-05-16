import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';

import "./navBar.css";
const NavBar = () => {
  useEffect(() => {
    const indicator = document.querySelector('.nav-indicator');
    const items = document.querySelectorAll('.nav-item');

    function handleIndicator(el) {
      items.forEach(item => {
        item.classList.remove('is-active');
        item.removeAttribute('style');
      });

      indicator.style.width = `${el.offsetWidth}px`;
      indicator.style.left = `${el.offsetLeft}px`;
      indicator.style.backgroundColor = el.getAttribute('active-color');

      el.classList.add('is-active');
      el.style.color = el.getAttribute('active-color');
    }


    items.forEach((item, index) => {
      item.addEventListener('click', e => { handleIndicator(e.target); });
      item.classList.contains('is-active') && handleIndicator(item);
    });
  })
  return (
    <nav className="nav">
      {sessionStorage.getItem("token") === null ? (
        <Link to={'login'} className="nav-item is-active" active-color="orange">login</Link>
      ) : ("")}
      {sessionStorage.getItem("token") === null ? (
        <Link to={'signup'} className="nav-item" active-color="green">signup</Link>
      ) : ("")}

      <Link to={''} className="nav-item" active-color="blue">events</Link>
      <span className="nav-indicator"></span>
    </nav>
  )
}

export default NavBar
