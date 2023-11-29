import { FC } from 'react';
import styles from '../styles/header.module.scss';

import { useNavigate } from 'react-router-dom';
import { Button } from 'shared';
import { ModalInteface } from '../types/types';

const Header: FC<ModalInteface> = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    setOpenModal(!openModal);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Здесь будет что-то лежать</div>

      <Button variant='fill' onClick={handleClick}>
        Sign In
      </Button>
    </header>
  );
};

export default Header;
