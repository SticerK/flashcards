import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Box } from '@radix-ui/themes';
import { Button, Input, Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { formSchema } from '../config/validationConfig';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IForgotPassword {
  email: string;
}

const ForgotPassword: FC = () => {
  const [openModal, setOpenModal] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<IForgotPassword> = (e) => {};

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal
        title='Forgot your password?'
        titleCenter
        setOpenModal={setOpenModal}
        openModal={openModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Controller
              name='email'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type='text'
                  placeholder='Enter your email'
                  labelName='Email'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors?.email?.message}
                />
              )}
            />
          </Box>
          <Box mt={'5'}>
            <Text>Enter your email address and we will send you further instructions </Text>
          </Box>
          <Flex direction={'column'} justify={'center'} mt={'8'}>
            <Button variant='fill' type='submit'>
              Sign Up
            </Button>
          </Flex>
        </form>
        <Flex direction={'column'} justify={'center'}>
          <Text align={'center'} mt={'5'}>
            Did you remember your password?
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
