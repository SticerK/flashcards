import { FC } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Input, Modal } from 'shared';
import { Box, Flex, Text } from '@radix-ui/themes';
import { useResetPasswordMutation } from 'app/redux/auth/authThunk';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IValidateResponce } from '../types/types';

const NewPassword: FC = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<{ password: string }>({ mode: 'onBlur' });
  const { token } = useParams();
  const navigate = useNavigate();

  const [resetPasswordRequest] = useResetPasswordMutation();

  const onSubmit: SubmitHandler<{ password: string }> = ({ password }) => {
    resetPasswordRequest({ token, password })
      .unwrap()
      .then(() => {
        navigate('/login');
        toast('Password changed successfully', { type: 'success' });
      })
      .catch((error: IValidateResponce) => {
        if (error.status === 404) return toast(error.data.message, { type: 'error' });
        error.data.errorMessages.forEach(({ field, message }) =>
          setError(field, { type: 'custom', message })
        );
      });
  };

  return (
    <>
      <Modal title='Create new password' titleCenter openModal={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Controller
              name='password'
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type='text'
                  placeholder='Enter new password'
                  labelName='Password'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors?.password?.message}
                />
              )}
            />
          </Box>
          <Box mt={'5'}>
            <Text>Create new password and we will send you further instructions to email</Text>
          </Box>
          <Flex direction={'column'} justify={'center'} mt={'8'}>
            <Button variant='fill' type='submit'>
              Create New Password
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default NewPassword;
