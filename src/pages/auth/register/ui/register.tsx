import { FC } from 'react';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Box } from '@radix-ui/themes';
import { Button, Input, Modal } from 'shared';
import { NavLink, useNavigate } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useUserRegisterMutation } from 'app/redux/auth/authThunk';
import { formSchema } from '../config/validationConfig';
import { yupResolver } from '@hookform/resolvers/yup';

export interface RegisterInputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Register: FC = () => {
  const [singUp] = useUserRegisterMutation();
  const navigate = useNavigate();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (field): void => {
    singUp({ email: field.email, password: field.password })
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(({ data }) => setError('email', { type: 'custom', message: data.errorMessages[0] }));
  };

  return (
    <>
      <Modal title='Sign Up' titleCenter openModal={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Box mt={'5'}>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type='password'
                  placeholder='Enter your password'
                  labelName='Password'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors?.password?.message}
                />
              )}
            />
          </Box>
          <Box mt={'5'}>
            <Controller
              name='passwordConfirm'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type='password'
                  placeholder='Enter your password'
                  labelName='Confirm password'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors?.passwordConfirm?.message}
                />
              )}
            />
          </Box>
          <Flex direction={'column'} justify={'center'} mt={'7'}>
            <Button variant='fill' type='submit'>
              Sign Up
            </Button>
          </Flex>
        </form>
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
