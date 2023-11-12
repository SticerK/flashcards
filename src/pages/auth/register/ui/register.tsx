import { FC, useState } from 'react';
import { Header } from 'widgets';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Button, TextField, IconButton } from '@radix-ui/themes';
import { InputPassword, Modal } from 'shared';
import { NavLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ExclamationTriangleIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useUserRegisterMutation } from 'app/redux/auth/authThunk';
import DefaultInput from 'shared/inputs/inputDefault/defaultInput';

export interface RegisterInputs {
  email: string;
  password: string;
}

const Register: FC = () => {
  const [openModal, setOpenModal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [singUp] = useUserRegisterMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (field): void => {
    singUp({ email: field.email, password: field.password })
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch((e) => setError('email', { type: 'custom', message: e.data.errorMessages[0] }));
  };

  return (
    <>
      <Header setOpenModal={setOpenModal} openModal={openModal} />
      <Modal title='Sign Up' titleCenter setOpenModal={setOpenModal} openModal={openModal}>
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
          <InputPassword
            errors={errors}
            registerName='passwordConfirm'
            labelName='Confirm password'
            placeholder='Enter your full password'
            register={register}
            watch={watch}
            isConfirm
          />
          <Flex direction={'column'} justify={'center'}>
            <Button mt={'8'} className={styles.button} type='submit'>
              Sign Up
            </Button>
            <Text align={'center'} mt={'5'}>
              Already have an account?
            </Text>
            <Text weight={'bold'} align={'center'} mt={'3'}>
              <NavLink to={'/login'} className={styles.linkCreate}>
                Sign In
              </NavLink>
            </Text>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default Register;
