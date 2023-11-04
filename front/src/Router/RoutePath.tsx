import LoginPage from '../Components/Login/LoginPage';
import RootLayout from '../Components/Login/RootLayout';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
]);

export default router;
