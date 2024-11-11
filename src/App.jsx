import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { jwtDecode } from "jwt-decode";
import ConfirmSignup from "./pages/ConfirmSignup";
import ForgotPassword from "./components/forgot password/ForgotPassword";
import UpdatePassword from "./components/forgot password/UpdatePassword";

function App() {
  const token = localStorage.getItem("token");

  let userRole;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
    } catch (error) {
      console.error("Failed to decode token", error);
      localStorage.removeItem("token");
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/confirm" element={<ConfirmSignup />} />
        <Route path="/help/forgot-password" element={<ForgotPassword />} />
        <Route path="/help/update-password" element={<UpdatePassword />} />
        <Route
          path="/admin/datas"
          element={userRole === "admin" ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
