import Login from "./containers/Login";
import BaseLayout from "./containers/BaseLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import Announcements from "./containers/Announcements";
import RoleManagement from "./containers/RoleManagement";
import CalendarPage from "./containers/CalendarPage";
import ProtectedRoute from "./containers/ProtectedRoute";
import PrivilegedRoute from "./containers/PrivilegedRoute";
import EventForm from "./containers/EventForm";
import ContextProvider from "./context/usercontext";
import Locations from "./containers/Locations";

function App() {
  // Role-based route protection component
  return (

    <ContextProvider>
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="login" index element={<Login />} />
          <Route path="unauthorized" element={<div>unauthorized</div>} />
          <Route path="announcements" element={<Announcements />} />
          <Route element={<ProtectedRoute />}>
            <Route path="openlab" element={<>schedule openlab</>} />
            <Route element={<PrivilegedRoute roles = {['admin']}/>}>
              <Route path="rolemanagement" element={<RoleManagement />} />
              <Route path="eventform" element={<EventForm />} />
              <Route path="locations" element={<Locations />} />
            </Route>
          </Route>
          <Route path="" element={<Navigate to="/calendar" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ContextProvider>
  );
}

export default App;
