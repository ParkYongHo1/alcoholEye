import React, { useState } from 'react';
import LoginId from './LoginId';
import LoginPassword from './LoginPassword';
import '../../css/login.css';
import mainLogo from '../../img/logo.jpg';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [userId, setUserID] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [userPasswordError, setUserPasswordError] = useState('');
  const navigate = useNavigate();

  const LoginSubmit = (event: any) => {
    event.preventDefault();
    console.log(userId, userPassword);
    axios
      .post('auth/signIn', {
        userId,
        userPassword,
      })
      .then((res: any) => {
        console.log(res.data);

        if (res.data === 'OK') {
          navigate('/main');
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
    // const error1 = LoginId(userId);
    // if (error1) {
    //   return setUserIdError(error1);
    // } else {
    //   setUserIdError('');
    // }
    // const error2 = LoginPassword(userPassword);
    // if (error2) {
    //   return setUserPasswordError(error2);
    // } else {
    //   setUserPasswordError('');
    // }
  };

  return (
    <>
      <div className='container'>
        <img src={mainLogo} className='login_logo' />
        <div className='name_div'>
          {' '}
          <span className='name_span'>알콜아이</span>
        </div>
        <form
          action='/test/login'
          method='post'
          onSubmit={LoginSubmit}
          id='loginForm'
        >
          <div className='form-group'>
            <input
              type='text'
              className='username'
              name='userId'
              placeholder='아이디를 입력해주세요'
              value={userId}
              onChange={(e) => setUserID(e.target.value)}
              required
            />
          </div>
          <br />
          <div className='form-group'>
            <input
              type='password'
              className='password'
              name='userPassword'
              placeholder='비밀번호를 입력해주세요'
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <br />

          <br />
          <div className='form-group2'>
            <input type='submit' className='submit' value='로그인' />
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
