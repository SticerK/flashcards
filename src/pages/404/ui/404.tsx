import { FC } from 'react';
import styles from '../styles/404.module.scss';
import notFoundImg from '../assets/404.png';

import { useNavigate } from 'react-router-dom';
import { Button } from 'shared';

const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <>
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
