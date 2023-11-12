import { ForgotPassword, Login, Register } from 'pages';
import { ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';

export enum routerPath {
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOTPASSWORD = '/forgotpassword',
}

export interface Router {
  path: routerPath;
  component: ReactElement;
}

// export const router: Router[] = [{ path: routerPath.LOGIN, component: <Login /> }];

export const router = createBrowserRouter([
  {
    path: routerPath.LOGIN,
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: routerPath.REGISTER,
    element: (
      <>
        <Register />
      </>
    ),
  },
  {
    path: routerPath.FORGOTPASSWORD,
    element: (
      <>
        <ForgotPassword />
      </>
    ),
  },
]);
