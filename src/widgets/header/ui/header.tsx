import { FC, useState } from 'react';
import styles from '../styles/header.module.scss';
import { Outlet, useNavigate } from 'react-router-dom';
import { EditUser, UserInfo } from 'features';
import { Container, Flex } from '@radix-ui/themes';

const Header: FC = () => {
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const openLogin = (): void => {
    setOpenModal(!openModal);
    navigate('/login');
  };

  return (
    <>
      <header className={styles.header}>
        <Container size={'4'}>
          <Flex justify={'between'} align={'center'}>
            <div className={styles.logo}>Здесь будет что-то лежать</div>
            <UserInfo openLogin={openLogin} openUserSettings={() => setOpenEdit(true)} />
          </Flex>
        </Container>
      </header>
      {openEdit && <EditUser setOpenModal={setOpenEdit} openModal={openEdit} />}
      <Outlet />
    </>
  );
};

export default Header;
