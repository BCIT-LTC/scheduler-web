import React, { useState, useContext } from "react";
import "./Locallogin.css";

export default function Locallogin({ setLocalLogin }) {
  const [email, setUserName] = useState();
  const [password, setPassword] = useState();
  const [credentialError, setCredentialError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:9000/login/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      if (response.status === 200) {
        window.location.href = '/';
      } else {
        setCredentialError("Incorrect username or password");
      }
    });
  };

  const handleLinkClick = (event) => {
    event.preventDefault();
    setLocalLogin(false);
  }

  return (
    <>
      <div className="locallogin-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <label>
            <p>Username</p>
            <input type="text" onChange={e => setUserName(e.target.value)} />
          </label>
          <label>
            <p>Password</p>
            <input type="password" onChange={e => setPassword(e.target.value)} />
          </label>
          <div className="error-message">
            {credentialError}
          </div>
          <div className="submit-button">
            <button type="submit">SIGN IN</button>
          </div>
          <p className="mt-4 login-link">No local account?{" "}<a href='/' onClick={handleLinkClick}>Login with BCIT</a> </p>
        </form>
      </div>
    </>
  );
}
