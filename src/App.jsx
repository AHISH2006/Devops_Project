import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Auth pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Dashboard pages
import DoctorHome from "./pages/DoctorHome";
import PatientHome from "./pages/PatientHome";
import AccountPage from "./pages/AccountPage";

// DevOps pages
import PipelinePage from "./pages/PipelinePage";
import ReportsPage from "./pages/ReportsPage";
import DeviceManagement from "./pages/DeviceManagement";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing & Auth */}
        <Route path="/"                element={<LandingPage />} />
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/signup"          element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password"  element={<ResetPassword />} />

        {/* Dashboards */}
        <Route path="/DoctorHome"      element={<DoctorHome />} />
        <Route path="/PatientHome"     element={<PatientHome />} />
        <Route path="/Account"         element={<AccountPage />} />

        {/* DevOps Features */}
        <Route path="/pipeline"        element={<PipelinePage />} />
        <Route path="/reports"         element={<ReportsPage />} />
        <Route path="/device-management" element={<DeviceManagement />} />

        {/* 404 */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
            <h1 style={{ fontSize: '4rem' }}>404</h1>
            <p>Page Not Found</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;