import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import VirtualDrillSimulation from './pages/virtual-drill-simulation';
import DisasterAlerts from './pages/disaster-alerts';
import Login from './pages/login';
import EmergencyContacts from './pages/emergency-contacts';
import StudentDashboard from './pages/student-dashboard';
import TeacherDashboard from './pages/teacher-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DisasterAlerts />} />
        <Route path="/virtual-drill-simulation" element={<VirtualDrillSimulation />} />
        <Route path="/disaster-alerts" element={<DisasterAlerts />} />
        <Route path="/login" element={<Login />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
