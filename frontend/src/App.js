import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import EmailConfirmation from "./pages/EmailConfirmation";
import LoginFormAttendee from "./pages/LoginFormAttendee";
import LoginFormOrganizer from "./pages/LoginFormOrganizer";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Registration />}></Route>
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
