import Login from "./containers/Login";
import RootUserLogin from "./containers/RootUserlogin";
import ProtectedLayout from "./containers/ProtectedLayout";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Announcements from "./containers/Announcements";
import RoleManagement from "./containers/RoleManagement";
import ProtectedRoute from "./containers/ProtectedRoute";

function App() {

// Role-based route protection component
  return (
    <>
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* public routes */}
          <Route path="login" index element={<Login />} />
          <Route path="rootuserlogin" index element={<RootUserLogin />} />
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
            <Route element={<ProtectedRoute/>}>
              <Route path="rolemanagement" element={<RoleManagement />} />
            </Route>
            <Route path="" element={<Navigate to="/home/calendar" replace />} />
            <Route path="*" element={<Navigate to="/home/calendar" replace />} />
          </Route>

        </Route>
      </Routes>
    </>
  );
}

export default App;
