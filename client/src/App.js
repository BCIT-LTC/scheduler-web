import { useEffect, useContext, useState } from "react";
// import "./App.css";
// import "react-calendar/dist/Calendar.css";
import Login from "./containers/Login";
import ProtectedLayout from "./containers/ProtectedLayout";
import logout from "./containers/logout";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Announcements from "./containers/Announcements";
// import CalendarPage from "./containers/CalendarPage";
// import Locallogin from "./components/Locallogin/Locallogin";
// import DataForm from "./containers/DataForm";
// import SurveyPage from "./containers/SurveyPage";
// import OpenLabSignIn from "./containers/OpenLabSignIn";
// import Home from "./containers/home";
// import DropdownAnnouncement from "./components/Announcement_dropdown/announcement.js";
// import Faq from "./components/Faq/Faq";
// import Cookies from "js-cookie";
// import jwtDecode from "jwt-decode";
// import AdminList from "./components/AdminList/AdminList";
// import LabGuidelinesPage from "./containers/LabGuidelinesPage";

function App() {
  // const [showLocalLogin, setShowLocalLogin] = useState();
  // let jwt = Cookies.get("jwt");
  // let user = null;
  // if (jwt !== undefined) {
  //   user = jwtDecode(jwt);
  // } else {
  //   if (showLocalLogin === true) {
  //     return <Locallogin setLocalLogin={setShowLocalLogin} />;
  //   } else {
  //     return <Login setLocalLogin={setShowLocalLogin} />;
  //   }
  // }

  return (
    <>
      {/* <nav className="navbar">
        <div className="nav-left">
          <Link to="/">
            <img src="bcit_logo.png" className="bcit-logo" alt="BCIT logo" />
          </Link>
        </div>
        <div id="navIcon">
          <div className="nav-icon">
            <DropdownAnnouncement />
          </div>
          {user.isLocal !== undefined ? (
            <Link to="/admins" className="nav-icon">
              <img
                src="./gear.svg"
                className="home-logo filter-blue"
                alt="settings"
              />
            </Link>
          ) : (
            ""
          )}
          <input
            type="image"
            src="./logout.svg"
            className="nav-icon logout-button filter-blue"
            alt="settings"
            onClick={logout}
          />
        </div>
      </nav> */}

      {/* <Routes>
        {jwt && <Route path="/login" element={<Home />} />}
        <Route index element={<Home />} />
        <Route path="/openlabs" element={<CalendarPage />} />
        <Route path="/openlabsignin" element={<OpenLabSignIn />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/guidelines" element={<LabGuidelinesPage />} />
        <Route path="/faq" element={<Faq />} />

        {user.isAdmin && <Route path="/update" element={<DataForm />} />}
        <Route path="/announcements" element={<Announcement />} />
        {user.isLocal && <Route path="/admins" element={<AdminList />} />}
      </Routes> */}

      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* public routes */}
          <Route path="login" index element={<Login />} />
          <Route path="unauthorized" element={<div>unauthorized</div>} />
          <Route path="" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* private routes */}
          <Route
            path="home"
            element={
              <ProtectedLayout />
            }>
            <Route path="calendar" element={<div>calendar page</div>} />
            <Route path="announcements" element={<Announcements/>} />
            <Route path="openlab" element={<div>schedule openlab</div>} />
            <Route path="users" element={<div>List of admin and instructor users, students not included</div>} />
            <Route path="" element={<Navigate to="/home/calendar" replace />} />
            <Route path="*" element={<Navigate to="/home/calendar" replace />} />
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
