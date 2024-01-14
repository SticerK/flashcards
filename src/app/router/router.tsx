import App from 'App';
import { Forgot, Login, NotFound, Home, Register, NewPassword, Pack } from 'pages';
import { ReactElement } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Header } from 'widgets';
import { AddCard, AddPack, DeletePack, EditPack } from 'features';

export enum routerPath {
  MAIN = '/',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOTPASSWORD = '/forgotpassword',
  HOME = '/home',
  ADD_PACK = 'addPack',
  EDIT_PACK = 'edit_pack/:id',
  DELETE_PACK = 'delete_pack/:id',
  NEW_PASSWORD = 'reset-password/:token',
  PACK = 'card',
  NOT_FOUND = '/*',
}

export interface Router {
  path: routerPath;
  component: ReactElement;
}

export const router = createBrowserRouter([
  {
    path: routerPath.MAIN,
    element: <App />,
    children: [
      {
        path: routerPath.MAIN,
        element: <Header />,
        children: [
          {
            path: routerPath.LOGIN,
            element: <Login />,
          },
          {
            path: routerPath.NEW_PASSWORD,
            element: <NewPassword />,
          },
          {
            path: routerPath.REGISTER,
            element: <Register />,
          },
          {
            path: routerPath.FORGOTPASSWORD,
            element: <Forgot />,
          },
          {
            path: routerPath.HOME,
            element: <Home />,
            children: [
              {
                path: routerPath.ADD_PACK,
                element: <AddPack />,
              },
              {
                path: routerPath.EDIT_PACK,
                element: <EditPack />,
              },
              {
                path: routerPath.DELETE_PACK,
                element: <DeletePack />,
              },
            ],
          },
          {
            path: routerPath.PACK,
            element: <Pack />,
            children: [
              {
                path: '',
                element: <AddCard />,
              },
            ],
          },
        ],
      },
      {
        path: routerPath.NOT_FOUND,
        element: (
          <>
            <NotFound />
          </>
        ),
      },
    ],
  },
]);
