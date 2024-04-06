import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
//import Authentication from './pages/Authentication/Authentication';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Calendar from './pages/Calendar/Calendar';
import Chat from './pages/Chat/Chat';
import Friends from './pages/Friends/Friends';
import Info from './pages/Info/Info';
import ClockInOut from './pages/ClockInOut/ClockInOut';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import { websiteTheme } from './WebsiteTheme';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={websiteTheme}>
    <React.StrictMode>
      {/* <RouterProvider router={router} /> */}
      <App />
    </React.StrictMode>
  </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
