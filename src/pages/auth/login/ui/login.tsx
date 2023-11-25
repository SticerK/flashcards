import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Button, TextField, Checkbox, Box, IconButton } from '@radix-ui/themes';
import { Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import clsx from 'clsx';
import { useUserLoginMutation } from 'app/redux/auth/authThunk';
import { Form, InputForm, PasswordForm } from 'etities/form';
import CheckboxForm from 'etities/form/checkbox/form.checkbox';
import { formSchema } from '../config/validationConfig';

export interface ModalInteface {
  setOpenModal: (x: boolean) => void;
  openModal: boolean;
}

export interface LoginInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: FC = () => {
  const [openModal, setOpenModal] = useState(true);
  const [setLogin] = useUserLoginMutation();

  const handleSubmit: SubmitHandler<LoginInputs> = (field) => {
    setLogin({ email: field.email, password: field.password, rememberMe: field.rememberMe });
  };

  const closeModal = () => {
    setOpenModal(false);
    // reset();
  };


  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal title='Sign In' titleCenter setOpenModal={closeModal} openModal={openModal}>
        <Form validateRules={formSchema} handleSubmit={handleSubmit}>
          <InputForm labelName='Email' type='email'
            placeholder='Enter your email' registerName={'email'} />
          <Box mt={'5'}><PasswordForm registerName='password' labelName='Password' placeholder='Enter your full password' /></Box>
          <Flex align={'center'} gap={'2'} mt={'6'}>
            <CheckboxForm registerName='rememberMe' />
            <Text size={'2'}>Remember me</Text>
          </Flex>
          <Flex justify={'end'}>
            <NavLink to={'/forgotpassword'} className={styles.link}>
              Forgot Password?
            </NavLink>
          </Flex>
          <Flex direction={'column'} justify={'center'}>
            <Button mt={'8'} className={styles.button} type='submit'>
              Sign In
            </Button>
          </Flex>
        </Form>
        <Flex direction={'column'} justify={'center'}>
          <Text align={'center'} mt={'5'}>
            Don't have an account?
          </Text>
          <Text weight={'bold'} align={'center'} mt={'3'}>
            <NavLink to={'/register'} className={styles.linkCreate}>
              Sign Up
            </NavLink>
          </Text>
        </Flex>
      </Modal>
    </>
  );
};

export default Login;
