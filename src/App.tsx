import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/common/Navigation';
import Home from './pages/landing/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ConfirmEmail from './pages/auth/ConfirmEmail';
import Dashboard from './pages/Dashboard';
import Loader from './components/common/Loader';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Loading..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader fullScreen text="Initializing..." />;
  }

  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <Home />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
