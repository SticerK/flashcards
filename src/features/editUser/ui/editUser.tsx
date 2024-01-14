import { ChangeEvent, FC, useState } from 'react';
import styles from '../styles/editUser.module.scss';
import { Button, Input, Loader, Modal } from 'shared';
import { ModalProps } from 'shared/modal/ui/modal';
import { Avatar, Flex, Text } from '@radix-ui/themes';
import { useLogoutMutation, useMeUpdateMutation, useUserMeQuery } from 'app/redux/auth/authThunk';
import { useNavigate } from 'react-router-dom';
import { Pencil1Icon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import ReactImageUploading from 'react-images-uploading';
import { IRequestMePatch } from 'app/redux/auth/types';
// import { convertToBase64 } from 'features/libs/convertBase64';

const EditUser: FC<ModalProps> = ({ openModal, setOpenModal }) => {
  const { data } = useUserMeQuery();
  const [updateUser, { isLoading }] = useMeUpdateMutation();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [edit, setEdit] = useState(false);
  const [updatingValues, setUpdatingValues] = useState<IRequestMePatch>({
    name: '',
    avatar: '',
  });

  const handleLogout = (): void => {
    logout(null);
    navigate('/login');
    setOpenModal(false);
  };

  const handleSave = (): void => {
    setEdit(false);
    const save = new FormData();
    updatingValues.avatar[0]?.file && save.append('avatar', updatingValues.avatar[0].file);
    updatingValues.name && save.set('name', updatingValues.name);
    updateUser(save);
    setUpdatingValues({ name: '', avatar: '' });
  };
  return (
    <Modal
      openModal={openModal}
      setOpenModal={setOpenModal}
      title='Personal Information'
      titleCenter
      className={styles.editModal}>
      <Flex direction={'column'} align={'center'} gap={'3'}>
        {isLoading ? (
          <Loader className={styles.loader} />
        ) : (
          <>
            <Button
              variant='ghost'
              className={styles.iconButton}
              onClick={() => setEdit(true)}
              visible={!edit}>
              <Pencil1Icon className={styles.icon} />
            </Button>
            <ReactImageUploading
              value={updatingValues.avatar}
              onChange={(img) => setUpdatingValues((prev) => ({ ...prev, avatar: img }))}
              maxNumber={2}
              dataURLKey='data_url'>
              {({ onImageUpload }) => (
                <Button
                  onClick={edit ? onImageUpload : () => null}
                  variant='ghost'
                  className={styles.btnAvatar}>
                  <Avatar
                    fallback={<div className={styles.plus}>+</div>}
                    src={updatingValues.avatar[0]?.data_url || data.avatar}
                    className={clsx(styles.avatar, { [styles.avatarEdit]: edit })}
                    radius='full'
                    mt={'3'}
                  />
                </Button>
              )}
            </ReactImageUploading>
            {!edit ? (
              <Text>{data.name}</Text>
            ) : (
              <Input
                type='text'
                value={updatingValues.name || data.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUpdatingValues((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            )}
            <Text className={styles.email} mb={'2'}>
              {data.email}
            </Text>
            {!edit ? (
              <Button variant='normal' onClick={() => handleLogout()}>
                Logout
              </Button>
            ) : (
              <Button variant='fill' onClick={handleSave}>
                Save Changes
              </Button>
            )}
          </>
        )}
      </Flex>
    </Modal>
  );
};

export default EditUser;
