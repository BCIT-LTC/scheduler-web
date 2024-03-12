import Login from "./containers/Login";
import RootUserLogin from "./containers/RootUserlogin";
// import ProtectedLayout from "./containers/ProtectedLayout";
import BaseLayout from "./containers/BaseLayout";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Announcements from "./containers/Announcements";
import RoleManagement from "./containers/RoleManagement";
import CalendarPage from "./containers/CalendarPage";
import ProtectedRoute from "./containers/ProtectedRoute";
import PrivilegedRoute from "./containers/PrivilegedRoute";
import NewEvent from "./containers/NewEvent";

function App() {
  // Role-based route protection component
  return (

    <>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="login" index element={<Login />} />
          <Route path="rootuserlogin" index element={<RootUserLogin />} />
          <Route path="unauthorized" element={<div>unauthorized</div>} />
          <Route path="announcements" element={<Announcements />} />
          <Route element={<ProtectedRoute />}>
            <Route path="openlab" element={<>schedule openlab</>} />
            <Route element={<PrivilegedRoute />}>
              <Route path="rolemanagement" element={<RoleManagement />} />
              <Route path="newevent" element={<NewEvent />} />
            </Route>
          </Route>
          <Route path="" element={<Navigate to="/calendar" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
