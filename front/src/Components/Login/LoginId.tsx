import { Outlet } from 'react-router-dom';
import React from 'react';
function LoginId(userId: String) {
  if (!userId) {
    return '아이디를 입력하세요';
  }
  return null;
}

export default LoginId;
