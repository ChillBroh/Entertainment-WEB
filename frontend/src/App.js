import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import EmailConfirmation from "./pages/EmailConfirmation";
import LoginFormAttendee from "./pages/LoginFormAttendee";
import LoginFormOrganizer from "./pages/LoginFormOrganizer";
import OrganizerRegistration from "./pages/OrganizerRegistration";
import AttendeeRegistration from "./pages/AttendeeRegistration";
import RegistrationSuccessOrganizer from "./pages/RegistrationSuccessOrganizer";
import RegistrationSuccessAttendee from "./pages/RegistrationSuccessAttendee";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/signup-attendee"
            element={<AttendeeRegistration />}
          ></Route>
          <Route path="/signup-organizer" element={<OrganizerRegistration />} />
          <Route
            path="/registered-organizer/:id"
            element={<RegistrationSuccessOrganizer />}
          />
          <Route
            path="/registered-attendee/:email"
            element={<RegistrationSuccessAttendee />}
          />
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/email-confirmation"
            element={<EmailConfirmation />}
          ></Route>
          <Route path="/login-attendee" element={<LoginFormAttendee />} />
          <Route path="/login-organizer" element={<LoginFormOrganizer />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
