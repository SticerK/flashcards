import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Button, Checkbox } from '@radix-ui/themes';
import { InputPassword, Modal } from 'shared';
import { NavLink } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import DefaultInput from 'shared/inputs/inputDefault/defaultInput';
import { useUserLoginMutation, useUserMeQuery } from 'app/redux/auth/authThunk';

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

  const { data } = useUserMeQuery(null);
  console.log(data);

  const onSubmit: SubmitHandler<LoginInputs> = (field) => {
    console.log(field);

    setLogin({ email: field.email, password: field.password, rememberMe: field.rememberMe });
  };

  const closeModal = (): void => {
    setOpenModal(false);
    reset();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal title='Sign In' titleCenter setOpenModal={closeModal} openModal={openModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DefaultInput
            registerName={'email'}
            errors={errors}
            labelName='Email'
            placeholder='Enter your email'
            register={register}
            errorText='Email Address is required'
          />
          <InputPassword
            errors={errors}
            registerName='password'
            labelName='Password'
            placeholder='Enter your full password'
            register={register}
          />
          <Flex align={'center'} gap={'2'} mt={'6'}>
            <Checkbox
              {...register('rememberMe')}
              onCheckedChange={(e): void => setValue('rememberMe', e)}
            />
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
            <Text align={'center'} mt={'5'}>
              Don't have an account?
            </Text>
            <Text weight={'bold'} align={'center'} mt={'3'}>
              <NavLink to={'/register'} className={styles.linkCreate}>
                Sign Up
              </NavLink>
            </Text>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default Login;
