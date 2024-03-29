import "./App.css";
import { React } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home";
import Loging from "./pages/Loging";
import ResetPassword from "./pages/ResetPassword";
import Registration from "./pages/Registration";
import EmailConfirmation from "./pages/EmailConfirmation";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/loging" element={<Loging />}></Route>
          <Route path="/signup" element={<Registration />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route
            path="/email-confirmation"
            element={<EmailConfirmation />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
