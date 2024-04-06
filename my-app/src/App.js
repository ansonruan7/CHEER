import { React, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

//routes
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Calendar from './pages/Calendar/Calendar';
import Chat from './pages/Chat/Chat';
import Friends from './pages/Friends/Friends';
import Info from './pages/Info/Info';
import ClockInOut from './pages/ClockInOut/ClockInOut';
import Home from './pages/Home/Home';
import Footer from './components/Footer';
import Gallery from './pages/Gallery/Gallery';
//import { locals } from '../../server/backend';
import AccountCentre from './pages/Account Centre/AccountCentre';
import PrivRegister from './pages/PrivRegister/PrivRegister';
import MouseCircle from './components/MouseCircle';

import Grid from '@mui/material/Grid';
import Header from './components/Navbar/Header/Header';
import { useLocation } from 'react-router-dom';
import { PrivacyTipOutlined, SecurityUpdateWarningTwoTone, SettingsSystemDaydreamOutlined } from '@mui/icons-material';
import EmailButton from './components/Footer';
//import { locals } from '../../server/backend';

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch('/api/users/verify', {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });
      const parseRes = await res.json();
      if (parseRes.type === 'Admin') {
        authAdmin();
      } else if (parseRes.type === 'Parent') {
        console.log('parent auth');
        authParent();
      } else if (parseRes.type === 'Private') {
        authPrivate();
      } else if (parseRes.type === 'Employee') {
        authEmployee();
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    checkAuthenticated();
  }, []);
  const checkAuth = () => {
    const storage = localStorage.getItem('token');
    if (storage) {
      return true;
    } else {
      return false;
    }
  }
  const authAdmin = () => {
    setAdmin(true);
    setIsAuthenticated(true);
    setUserType('Admin');
  }
  const authEmployee = () => {
    setEmployee(true);
    setIsAuthenticated(true);
    setUserType('Employee');
  }
  const authParent = () => {
    setParent(true);
    setIsAuthenticated(true);
    setUserType('Parent');
  }
  const authPrivate = () => {
    setPrivate(true);
    setIsAuthenticated(true);
    setUserType('Private');
  }
  const getAuth = () => {
    if (parent) {
      return 'Parent';
    } else if (priv) {
      return 'Private';
    } else if (admin) {
      return 'Admin';
    }
  }
  //user types
  const [employee, setEmployee] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [parent, setParent] = useState(false);
  const [priv, setPrivate] = useState(false);
  const [userType, setUserType] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  return (
    <div>
      <Navbar uType={userType} />
      <MouseCircle />
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home uType={userType} />} />
          <Route
            path="/login"
            element={!isAuthenticated ? (<Login authAdmin={authAdmin} authParent={authParent} authPrivate={authPrivate} authEmployee={authEmployee} />) : (<Navigate to="/" />)} />
          <Route
            path="/register"
            element={!isAuthenticated ? (<Register authAdmin={authAdmin} authParent={authParent} authPrivate={authPrivate} />) : (<Navigate to="/" />)} />
          <Route
            path="/calendar"
            element={isAuthenticated ? (<Calendar getAuth={getAuth} />) : (<Navigate to="/login" />)} />
          <Route
            path="/privRegister"
            element={isAuthenticated ? (<PrivRegister getAuth={getAuth} />) : (<Navigate to="/login" />)} />
          <Route
            path="/accounts"
            element={isAuthenticated ? (<AccountCentre getAuth={getAuth} />) : (<Navigate to="/login" />)} />
          <Route
            path="/clockinout"
            element={isAuthenticated ? (<ClockInOut getAuth={getAuth} />) : (<Navigate to="/login" />)} />
          <Route
            path="/chat"
            element={isAuthenticated ? (<Chat getAuth={getAuth}/>) : (<Navigate to="/login" />)} />
          <Route
            path="/friends"
            element={isAuthenticated ? (<Friends />) : (<Navigate to="/login" />)} />
          <Route
            path="/info"
            element={isAuthenticated ? (<Info getAuth={getAuth} />) : (<Navigate to="/login" />)} />
          <Route
            path="/accounts"
            element={admin ? (<AccountCentre />) : (<Navigate to="/login" />)} />
          <Route
            path="/gallery"
            element={isAuthenticated ? (<Gallery getAuth={getAuth} />) : (<Navigate to="/login" />)} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;