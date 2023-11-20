import LoginPage from '../Components/Login/LoginPage';
import MainPage from '../Components/Main/MainPage';
import RootLayout from '../Components/Login/LoginId';
import DriverInfo from '../Components/Main/DriverInfo';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <LoginPage />,
      },
      {
        path: '/main',
        element: <MainPage />,
      },
      { path: '/drive/:userUno', element: <DriverInfo /> },
    ],
  },
]);

export default router;
