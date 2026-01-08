import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { SecureTokenStorage } from './utils/secureAuth';
import LandingPage from './pages/LandingPage';
import { RegisterUser } from './pages/RegisterUser';
import Dashboard from './pages/Dashboard';
import { Login } from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { Upload } from './pages/Upload';
import { MyUploads } from './pages/MyUploads';
import { Search } from './pages/Search';
import { Profile } from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import ProfessorPanel from './pages/ProfessorPanel';
import StudentPanel from './pages/StudentPanel';
import { FileDetails } from './pages/FileDetails';

const RequireAuth = ({ children }) => {
  // Guard routes when there's no active session; keeps history back button from showing protected pages after logout.
  const token = SecureTokenStorage.hasToken();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RedirectIfAuthed = ({ children }) => {
  const token = SecureTokenStorage.hasToken();
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  useEffect(() => {
    document.title = 'Notesway';
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = '/note.png';
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RedirectIfAuthed><LandingPage /></RedirectIfAuthed>} />
          <Route path="/home" element={<RedirectIfAuthed><LandingPage /></RedirectIfAuthed>} />
          <Route path="/landing" element={<RedirectIfAuthed><LandingPage /></RedirectIfAuthed>} />
          <Route
            path="/dashboard"
            element={(
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            )}
          />
          <Route path="/register" element={<RedirectIfAuthed><RegisterUser /></RedirectIfAuthed>} />
          <Route path="/register-student" element={<RedirectIfAuthed><RegisterUser isStudentRegistration={true} /></RedirectIfAuthed>} />
          <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
          <Route path="/signin" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
          <Route path="/forgot-password" element={<RedirectIfAuthed><ForgotPassword /></RedirectIfAuthed>} />
          <Route path="/reset-password" element={<RedirectIfAuthed><ResetPassword /></RedirectIfAuthed>} />
          <Route
            path="/upload"
            element={(
              <RequireAuth>
                <Upload />
              </RequireAuth>
            )}
          />
          <Route
            path="/my-uploads"
            element={(
              <RequireAuth>
                <MyUploads />
              </RequireAuth>
            )}
          />
          <Route
            path="/search"
            element={(
              <RequireAuth>
                <Search />
              </RequireAuth>
            )}
          />
          <Route
            path="/profile"
            element={(
              <RequireAuth>
                <Profile />
              </RequireAuth>
            )}
          />
          <Route
            path="/admin"
            element={(
              <RequireAuth>
                <AdminPanel />
              </RequireAuth>
            )}
          />
          <Route
            path="/professor"
            element={(
              <RequireAuth>
                <ProfessorPanel />
              </RequireAuth>
            )}
          />
          <Route
            path="/student"
            element={(
              <RequireAuth>
                <StudentPanel />
              </RequireAuth>
            )}
          />
          <Route
            path="/file/:id"
            element={(
              <RequireAuth>
                <FileDetails />
              </RequireAuth>
            )}
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
