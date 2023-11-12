import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Button, TextField, Checkbox, Box } from '@radix-ui/themes';
import { Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import DefaultInput from 'shared/inputs/inputDefault/defaultInput';
import { useForm } from 'react-hook-form';

const ForgotPassword: FC = () => {
  const [openModal, setOpenModal] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal
        title='Forgot your password?'
        titleCenter
        setOpenModal={setOpenModal}
        openModal={openModal}>
        <DefaultInput
          registerName={'email'}
          errors={errors}
          labelName='Email'
          placeholder='Enter your email'
          register={register}
          errorText='Email Address is required'
        />
        <Text mt={'3'}>Enter your email address and we will send you further instructions </Text>
        <Flex direction={'column'} justify={'center'}>
          <Button mt={'8'} className={styles.button}>
            Sign Up
          </Button>
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
