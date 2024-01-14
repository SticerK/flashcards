import { Flex, Text } from '@radix-ui/themes';
import { FC } from 'react';
import { Button } from 'shared';
import styles from '../styles/packCard.module.scss';

const EmptyData: FC = () => {
  return (
    <Flex direction={'column'} align={'center'} gap={'3'} mt={'9'}>
      <Text className={styles.text}>This pack is empty. Click add new card to fill this pack</Text>
      <Button variant='fill' radius='medium'>
        Add New Card
      </Button>
    </Flex>
  );
};

export default EmptyData;
