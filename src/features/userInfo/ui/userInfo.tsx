import { FC } from 'react';
import styles from '../styles/userInfo.module.scss';
import { Button } from 'shared';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import { useUserMeQuery } from 'app/redux/auth/authThunk';

interface IUserInfo {
  openLogin: () => void;
  openUserSettings: () => void;
}

const UserInfo: FC<IUserInfo> = ({ openLogin, openUserSettings }) => {
  const { data } = useUserMeQuery();

  return !data?.id ? (
    <Button variant='fill' onClick={openLogin} radius='medium'>
      Sign In
    </Button>
  ) : (
    <Flex className={styles.userInfo} gap={'2'} align={'center'} onClick={openUserSettings}>
      <Text>{data.email}</Text>
      <Avatar
        fallback={<div className={styles.plus}>+</div>}
        src={data.avatar}
        className={styles.emptyAvatar}
        radius='full'
      />
    </Flex>
  );
};

export default UserInfo;
