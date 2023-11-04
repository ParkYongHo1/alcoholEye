import React from 'react';

import '../../css/login.css';
import mainLogo from '../../img/logo.jpg';
function LoginPage() {
  return (
    <>
      <div className='container'>
        <img src={mainLogo} className='login_logo' />
        <div className='name_div'>
          {' '}
          <span className='name_span'>알콜아이</span>
        </div>
        <form action='login' method='POST' id='loginForm'>
          <div className='form-group'>
            <input
              type='text'
              className='username'
              name='username'
              placeholder='아이디를 입력해주세요'
              required
            />
          </div>
          <br />
          <div className='form-group'>
            <input
              type='password'
              className='password'
              name='password'
              placeholder='비밀번호를 입력해주세요'
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
