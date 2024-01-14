import { Flex } from '@radix-ui/themes';
import { FC, PropsWithChildren } from 'react';
import styles from '../styles/mainTitle.module.scss';

const MainTitle: FC<PropsWithChildren<{ title: string }>> = (props) => {
  const { title, children } = props;

  return (
    <Flex align={'center'} justify={'between'}>
      <div className={styles.title}>{title}</div>
      {children}
    </Flex>
  );
};

export default MainTitle;
