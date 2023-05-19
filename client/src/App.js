import { useEffect, useContext, useState } from "react";
import "./App.css";
import "react-calendar/dist/Calendar.css";
import Login from "./components/Login/Login.js";
import logout from "./containers/logout";
import { Routes, Route, Link } from "react-router-dom";
import CalendarPage from "./containers/CalendarPage";
import Locallogin from './components/Locallogin/Locallogin';
import DataForm from "./containers/DataForm";
import SurveyPage from "./containers/SurveyPage";
import Home from "./containers/home";
import DropdownAnnouncement from "./components/Announcement_dropdown/announcement.js";
import Announcement from "./components/Announcements/Announcement";
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import AdminList from "./components/AdminList/AdminList";
import LabGuidelinesPage from "./containers/LabGuidelinesPage";

function App() {
  const [showLocalLogin, setShowLocalLogin] = useState();
  let jwt = Cookies.get('jwt');
  let user = null;
  if (jwt !== undefined) {
    user = jwtDecode(jwt);
  } else {
    if (showLocalLogin === true) {
      return <Locallogin setLocalLogin={setShowLocalLogin} />;
    } else {
      return <Login setLocalLogin={setShowLocalLogin} />;
    }
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img src="bcit_logo.png" className="bcit-logo" alt="BCIT logo" />
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
        <div id="navIcon">
          {
            user.isLocal !== undefined ?
              <Link to="/admins"><img src="./gear.svg" className="home-logo filter-blue" alt="settings" /></Link>
              : ''
          }
          <DropdownAnnouncement />
          <Link to="/"><img src="./home_image-128.png" className="home-logo" alt="home" /></Link>
        </div>

      </nav>
      <Routes>
        {jwt && <Route path="/login" element={<Home />} />}
        <Route index element={<Home />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        < Route path="/guidelines" element={<LabGuidelinesPage />} />
        {user.isAdmin && <Route path="/update" element={<DataForm />} />}
        {user.isAdmin && <Route path="/announcements" element={<Announcement />} />}
        {user.isLocal && <Route path="/admins" element={<AdminList />} />}
      </Routes>
    </>
  );
}

export default App;
