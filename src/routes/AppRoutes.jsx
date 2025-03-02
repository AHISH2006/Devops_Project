import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import DoctorHome from "../pages/DoctorHome";
import PatientHome from "../pages/PatientHome";
import SignupPage from "../pages/SignupPage";
import ReportsPage from "../pages/ReportsPage";
import EMGSession from "../pages/EMGSession";
import CreateSession from "../pages/CreateSession";
import Programs from "../pages/Programs";
import DeviceManagement from "../pages/DeviceManagement";
import AccountPage from "../pages/AccountPage";

<pages></pages>


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Account" element={<AccountPage/>} />
        <Route path="/DoctorHome" element={<DoctorHome/>} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/EMG" element={<EMGSession />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/PatientHome" element={<PatientHome/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-session" element={<CreateSession/>} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
