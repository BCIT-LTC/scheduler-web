import { useEffect, useContext, useState } from "react";
import Login from "./containers/Login";
import ProtectedLayout from "./containers/ProtectedLayout";
import logout from "./containers/logout";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Announcements from "./containers/Announcements";

function App() {

  return (
    <>
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
