import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Login from "./containers/Login";
import BaseLayout from "./containers/BaseLayout";
import Announcements from "./containers/Announcements";
import RoleManagement from "./containers/RoleManagement";
import CalendarPage from "./containers/CalendarPage";
import ProtectedRoute from "./containers/ProtectedRoute";
import PrivilegedRoute from "./containers/PrivilegedRoute";
import EventForm from "../client/components/Events/EventForm";
import Locations from "./containers/Locations";
import LocationForm from "./components/Locations/LocationForm";
import UserDetails from "./containers/UserDetails";
import AnnouncementForm from "./components/Announcements/AnnouncementForm";

import ContextProvider from "./context/usercontext";

const theme = createTheme();

// ... rest of your code


function App() {
  // Role-based route protection component
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="login" index element={<Login />} />
            <Route path="unauthorized" element={<div>unauthorized</div>} />
            <Route path="announcements" element={<Announcements />} />
            <Route element={<ProtectedRoute />}>
              <Route path="openlab" element={<>schedule openlab</>} />
              <Route element={<PrivilegedRoute roles={['admin']} />}>
                <Route path="rolemanagement" element={<RoleManagement />} />
                <Route path="userdetails" element={<UserDetails />} />
                <Route path="createevent" element={<EventForm key="createevent" />} />
                <Route path="editevent" element={<EventForm key="editevent" />} />
                <Route path="editseries" element={<EventForm key="editseries" />} />
                <Route path="locations" element={<Locations />} />
                <Route path="createlocation" element={<LocationForm key="createlocation" />} />
                <Route path="editlocation" element={<LocationForm key="editlocation" />} />
                <Route path="createannouncement" element={<AnnouncementForm key={"createannouncement"} />} />
                <Route path="editannouncement" element={<AnnouncementForm key={"editannouncement"} />} />
              </Route>
            </Route>
            <Route path="" element={<Navigate to="/calendar" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
