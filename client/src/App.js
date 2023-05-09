import { useEffect, useContext, useState } from "react";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import Login from "./components/Login/Login.js";
import logout from "./containers/logout";
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./containers/Calendar";
import Locallogin from './components/Locallogin/Locallogin';
import DataForm from "./containers/DataForm";
import SurveyPage from "./containers/SurveyPage";
import Home from "./containers/home";
import { GlobalContext } from "./context";
import DropdownAnnouncement from "./components/Announcement_dropdown/announcement.js";
import Announcement from "./components/Announcements/Announcement";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

function App() {
  const [showLocalLogin, setShowLocalLogin] = useState();
  const {
    state: {
      userData: { token, isAdmin },
    },
  } = useContext(GlobalContext);
  const context = useContext(GlobalContext)

  if (isAdmin === true) {
    sessionStorage.setItem("isAdmins", isAdmin);
  }
  const isAdmins = sessionStorage.getItem("isAdmins");

  useEffect(() => {
    console.log("token changed", token);
  }, [token]);

  let jwt = Cookies.get('jwt');
  if (jwt !== undefined && !token) {
    var user = jwtDecode(jwt);
    context.updateUserData(user.email, jwt, user.isAdmin);
  }
  if (!token) {
    if (showLocalLogin === true) {
      return <Locallogin setLocalLogin={setShowLocalLogin} />;
    } else {
      return <Login setLocalLogin={setShowLocalLogin} />;
    }
  }

  window.addEventListener("beforeunload", function (e) {
    const userEmail = sessionStorage.getItem('userEmail');
    const baseTime = new Date();
    const timezone = baseTime.getTimezoneOffset() * 60000;
    const logoutTime = new Date(Date.now() - timezone).toISOString().slice(0, 19).replace("T", " ");

    fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        'Authorization': Cookies.get('jwt')
      },
      mode: 'cors',
      body: JSON.stringify({ email: userEmail, logoutTime: logoutTime }),
    })
  })

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img src="bcit_logo.png" className="bcit-logo" alt="BCIT logo" />
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
        <div id="navIcon">
          <DropdownAnnouncement />
          <Link to="/"><img src="./home_image-128.png" className="home-logo" /></Link>
        </div>

      </nav>
      <Routes>
        {token && <Route path="/login" element={<Home />} />}
        <Route index element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        {isAdmins && <Route path="/update" element={<DataForm />} />}
        {isAdmins && <Route path="/announcements" element={<Announcement />} />}
      </Routes>
    </>
  );
}

export default App;
