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
  // useEffect(() => {
  //   axios
  //     .get('test/admin')
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // });
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
