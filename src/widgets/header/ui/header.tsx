import { FC } from 'react';
import styles from '../styles/header.module.scss';
import { Flex, Text, Button, Theme, Dialog, TextField, Checkbox } from '@radix-ui/themes';
import { Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import { ModalInteface } from 'pages/auth/login/ui/login';

const Header: FC<ModalInteface> = ({ openModal, setOpenModal }) => {
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
