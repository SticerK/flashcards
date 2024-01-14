import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'shared';
import { Flex, Text } from '@radix-ui/themes';
import { useDeleteDeskItemMutation, useDeskItemQuery } from 'app/redux/desc/descApi';

const DeletePack: FC = () => {
  const { id } = useParams();
  const { data } = useDeskItemQuery(id);
  const navigate = useNavigate();
  const [handleDeletePack] = useDeleteDeskItemMutation();

  const handleDelete = (): void => {
    handleDeletePack(id)
      .unwrap()
      .then(() => navigate('/home'));
  };

  return (
    <Modal title='Edit Pack' openModal={true} setOpenModal={() => navigate('/home')}>
      <Flex mt={'5'} mb={'5'} align={'center'} gap={'2'}>
        <Text size={'2'}>
          Do you really want to remove {data?.name}? All cards will be deleted.
        </Text>
      </Flex>
      <Flex justify={'between'}>
        <Button variant='normal' radius='small' onClick={() => navigate('/home')}>
          Cancel
        </Button>
        <Button variant='fill' radius='small' type='submit' onClick={handleDelete}>
          Delete Pack
        </Button>
      </Flex>
    </Modal>
  );
};

export default DeletePack;
