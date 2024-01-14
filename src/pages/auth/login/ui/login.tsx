import { FC } from 'react';
import styles from '../../styles/auth.module.scss';
import { Flex, Text, Box, Checkbox } from '@radix-ui/themes';
import { Input, Modal, Button } from 'shared';
import { NavLink, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useUserLoginMutation } from 'app/redux/auth/authThunk';
import { formSchema } from '../config/validationConfig';
import { yupResolver } from '@hookform/resolvers/yup';

export interface LoginInputs {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: FC = () => {
  const [setLogin] = useUserLoginMutation();
  const navigate = useNavigate();
  const {
    control,
    setError,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rememberMe: false,
    },
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = (field) => {
    setLogin({ email: field.email, password: field.password, rememberMe: field.rememberMe })
      .unwrap()
      .then(() => navigate('/home'))
      .catch(({ data }) => {
        console.log(data);

        setError('email', { type: 'custom', message: data?.message });
      });
  };

  return (
    <>
      <Modal title='Sign In' titleCenter openModal={true}>
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
          <Flex align={'center'} gap={'2'} mt={'6'}>
            <Checkbox
              {...register('rememberMe')}
              onCheckedChange={(e: boolean) => setValue('rememberMe', e)}
            />
            <Text size={'2'}>Remember me</Text>
          </Flex>
          <Flex justify={'end'}>
            <NavLink to={'/forgotpassword'} className={styles.link}>
              Forgot Password?
            </NavLink>
          </Flex>
          <Flex direction={'column'} justify={'center'} mt={'7'}>
            <Button variant='fill' type='submit' radius='medium'>
              Sign In
            </Button>
          </Flex>
        </form>
        <Flex direction={'column'} justify={'center'}>
          <Text align={'center'} mt={'5'}>
            Don&apos;t have an account?
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
