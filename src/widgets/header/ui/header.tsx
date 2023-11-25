import { FC } from 'react';
import styles from '../styles/header.module.scss';
import { NavLink } from 'react-router-dom';
import { ModalInteface } from 'pages/auth/login/ui/login';
import { useUserMeQuery } from 'app/redux/auth/authThunk';

const Header: FC<ModalInteface> = ({ openModal, setOpenModal }) => {

  const data = useUserMeQuery(null)

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Здесь будет что-то лежать</div>

      <NavLink to={'/login'} className={styles.button} onClick={() => setOpenModal(!openModal)}>
        Sign In
      </NavLink>
    </header>
  );
};

export default Header;
