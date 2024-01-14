import { useUserMeQuery } from 'app/redux/auth/authThunk';
import { FC, useLayoutEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import img from '../../Снимок экрана 2024-01-10 093529.png'

const App: FC = () => {
  const { isError } = useUserMeQuery();
  return (
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
