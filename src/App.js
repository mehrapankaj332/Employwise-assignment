import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import UsersList from './components/UsersList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Navigate to="/login" replace />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/users" /> : <Login onLogin={handleLogin} />} 
        />
        <Route 
          path="/users" 
          element={isAuthenticated ? <UsersList /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
