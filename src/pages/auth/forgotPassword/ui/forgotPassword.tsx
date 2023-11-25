import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Button, TextField, Checkbox, Box } from '@radix-ui/themes';
import { Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form, InputForm } from 'etities/form';
import { formSchema } from '../config/validationConfig';

export interface IForgotPassword {
  email: string
}


const ForgotPassword: FC = () => {
  const [openModal, setOpenModal] = useState(true);

  const handleSubmit: SubmitHandler<IForgotPassword> = (e) => {
  }

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal
        title='Forgot your password?'
        titleCenter
        setOpenModal={setOpenModal}
        openModal={openModal}>
        <Form validateRules={formSchema} handleSubmit={handleSubmit}>
          <Box>
            <InputForm labelName='Email' type='email'
              placeholder='Enter your email' registerName={'email'} />
          </Box>
          <Box mt={'5'}><Text>Enter your email address and we will send you further instructions </Text></Box>
          <Flex direction={'column'} justify={'center'}>
            <Button mt={'8'} className={styles.button}>
              Sign Up
            </Button>
          </Flex>
        </Form>
        <Flex direction={'column'} justify={'center'}>
          <Text align={'center'} mt={'5'}>
            <NavLink to={'/'} className={styles.link}>
              Did you remember your password?
            </NavLink>
          </Text>
          <Text weight={'bold'} align={'center'} mt={'3'}>
            <NavLink to={'/login'} className={styles.linkCreate}>
              Try logging in
            </NavLink>
          </Text>
        </Flex>
      </Modal>
    </>
  );
};

export default ForgotPassword;
