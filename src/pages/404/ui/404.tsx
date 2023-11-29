import { FC, useState } from 'react';
import styles from '../styles/404.module.scss';
import notFoundImg from '../assets/404.png';
import { Header } from 'widgets';
import { useNavigate } from 'react-router-dom';
import { Button } from 'shared';

const NotFound: FC = () => {
  const [openModal, setOpenModal] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal}></Header>
      <div className={styles.container}>
        <img src={notFoundImg} />
        <p className={styles.text}>Sorry! Page not found!</p>
        <Button onClick={() => navigate('/home')} variant='fill'>
          Back to home page
        </Button>
      </div>
    </>
  );
};

export default NotFound;
