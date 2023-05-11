import React from 'react';
import './Login.css';


// Moved fetch request to inside the Login(). This sends the username and password as json to localhost:8000/login to get authenticated
export default function Login({ setLocalLogin }) {
  const handleLinkClick = (event) => {
    event.preventDefault();
    setLocalLogin(true);
  }
  return (
    <>
      <div>
        <div className="login-wrapper">
          <form className="form" action="/loginsaml" method="post">
            <h1>Sign in with BCIT</h1>
            <div className="submit-button">
              <button type="submit">SIGN IN</button>
            </div>
            <p className="mt-4">Have a local account?{" "}<a href='/' onClick={handleLinkClick}>Login here</a></p>
          </form>
        </div>
      </div>
    </>
  )
}

