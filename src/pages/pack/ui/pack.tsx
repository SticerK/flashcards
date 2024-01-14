import { FC } from 'react';
import styles from '../styles/pack.module.scss';
import { Container, Flex } from '@radix-ui/themes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { PackCard } from 'widgets';
import { useDeskItemQuery } from 'app/redux/desc/descApi';
import EmptyData from 'widgets/pack/ui/emptyData';
import { Loader } from 'shared';

const Pack: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = new URLSearchParams(searchParams);
  const { data, isLoading, isSuccess } = useDeskItemQuery(search.get('id'));

  return (
    <Container className={styles.container}>
      {isLoading && <Loader />}
      {isSuccess && (
        <>
          <Flex align={'center'} mt={'5'} className={styles.back} mb={'5'}>
            <ArrowLeftIcon />
            <a onClick={() => navigate(-1)}>Back to Packs List</a>
          </Flex>
          {data.cardsCount ? <PackCard name={data.name} /> : <EmptyData />}
        </>
      )}
    </Container>
  );
};

export default Pack;
