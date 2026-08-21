import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CaseBriefingPage from './pages/CaseBriefingPage';
import InvestigationPage from './pages/InvestigationPage';
import CaseRepositoryPage from './pages/CaseRepositoryPage';
import CaseResolutionPage from './pages/CaseResolutionPage';
import EvidenceLockerPage from './pages/EvidenceLockerPage';
import ColdCasesPage from './pages/ColdCasesPage';
import PersonnelPage from './pages/PersonnelPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* App Routes (with Sidebar + TopBar layout) */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/cases" element={<CaseRepositoryPage />} />
          <Route path="/evidence" element={<EvidenceLockerPage />} />
          <Route path="/cold-cases" element={<ColdCasesPage />} />
          <Route path="/personnel" element={<PersonnelPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Standalone Routes (no shared layout) */}
        <Route path="/case/:id" element={<CaseBriefingPage />} />
        <Route path="/investigate/:id" element={<InvestigationPage />} />
        <Route path="/resolution/:id" element={<CaseResolutionPage />} />
      </Routes>
    </BrowserRouter>
  );
}
