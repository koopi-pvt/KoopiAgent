import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/common/Navigation';
import Home from './pages/landing/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  // debug: helps verify the root App component is mounting in the browser
  // remove this after debugging
  console.log('App mounted');
  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
