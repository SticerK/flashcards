import { FC } from 'react';
import { Button, Modal } from 'shared';
import EmailImage from '../assets/email.svg';
import { ModalInteface } from 'widgets/header/types/types';
import { Flex, Text } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';

interface ICheckEmail extends ModalInteface {
  email: string;
}

const CheckEmail: FC<ICheckEmail> = ({ openModal, setOpenModal, email }) => {
  const navigate = useNavigate();

  return (
    <>
      <Modal titleCenter title='Check Email' openModal={openModal} setOpenModal={setOpenModal}>
        <Flex align={'center'} direction={'column'}>
          <EmailImage />
          <Text align={'center'} mt={'3'} mb={'8'}>
            We’ve sent an Email with instructions to {email}
          </Text>
        </Flex>
        <Button variant='fill' onClick={() => navigate('/login')}>
          Back to Sign In
        </Button>
      </Modal>
    </>
  );
};

export default CheckEmail;
