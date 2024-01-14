import { FC } from 'react';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Box } from '@radix-ui/themes';
import { Button, Input, Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

import { useForgotPasswordMutation } from 'app/redux/auth/authThunk';
import { toast } from 'react-toastify';

export interface IForgotPasswordForm {
  email: string;
}

interface IForgotPassword {
  setCheckMainModal: (x: boolean) => void;
}

const ForgotPassword: FC<IForgotPassword> = ({ setCheckMainModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext();
  const [handleForgotPassword] = useForgotPasswordMutation();

  const onSubmit: SubmitHandler<IForgotPasswordForm> = (e) => {
    handleForgotPassword(e.email)
      .unwrap()
      .then(() => setCheckMainModal(true))
      .catch(({ data }) => {
        toast(data.message);
      });
  };

  console.log(errors);

  return (
    <>
      <Modal title='Forgot your password?' titleCenter openModal={true}>
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
