import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Button, Box } from '@radix-ui/themes';
import { Modal } from 'shared';
import { NavLink, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { useUserRegisterMutation } from 'app/redux/auth/authThunk';
import { Form, InputForm, PasswordForm } from 'etities/form';
import { formSchema } from '../config/validationConfig';

export interface RegisterInputs {
  email: string;
  password: string;
}

const Register: FC = () => {
  const [openModal, setOpenModal] = useState(true);
  const [singUp, { data }] = useUserRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit: SubmitHandler<RegisterInputs> = (field): void => {
    singUp({ email: field.email, password: field.password })
      .unwrap()
      .then(() => {
        localStorage.setItem('token', data.token);
        navigate('/login');
      });
    // .catch((e) => methods.setError('email', { type: 'custom', message: e.data.errorMessages[0] }));
  };

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal title='Sign Up' titleCenter setOpenModal={setOpenModal} openModal={openModal}>
        <Form validateRules={formSchema} handleSubmit={handleSubmit}>
          <Box mt={'5'}>
            <InputForm
              labelName='Email'
              type='email'
              placeholder='Enter your email'
              registerName={'email'}
            />
          </Box>
          <Box mt={'5'}>
            <PasswordForm
              registerName='password'
              labelName='Password'
              placeholder='Enter your full password'
            />
          </Box>
          <Box mt={'5'}>
            <PasswordForm
              registerName='passwordConfirm'
              labelName='Confirm password'
              placeholder='Enter your full password'
            />
          </Box>
          <Flex direction={'column'} justify={'center'}>
            <Button mt={'8'} className={styles.button} type='submit'>
              Sign Up
            </Button>
          </Flex>
        </Form>

        <Flex direction={'column'} justify={'center'}>
          <Text align={'center'} mt={'5'}>
            Already have an account?
          </Text>
          <Text weight={'bold'} align={'center'} mt={'3'}>
            <NavLink to={'/login'} className={styles.linkCreate}>
              Sign In
            </NavLink>
          </Text>
        </Flex>
      </Modal>
    </>
  );
};

export default Register;
