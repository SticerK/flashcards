import { Container } from '@radix-ui/themes';
import MainTitle from 'entities/mainTitle/ui/mainTitle';
import { FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'shared';
import { Filters, MainTable } from 'widgets';

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container size={'4'} mt={'8'}>
        <MainTitle title='Packs list'>
          <Button variant='fill' onClick={() => navigate('addPack')}>
            Add New Pack
          </Button>
        </MainTitle>
        <Filters />
        <MainTable />
        <Outlet />
      </Container>
    </>
  );
};

export default Home;
