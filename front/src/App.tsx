import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import router from './Router/RoutePath';
import { RouterProvider } from 'react-router-dom';
import './css/login.css';
import './css/main.css';
import loginLogo from './img/logo.jpg';
import mainLogo from './img/mainLogo.png';

function App() {
  const [member, setMember] = useState('');
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
