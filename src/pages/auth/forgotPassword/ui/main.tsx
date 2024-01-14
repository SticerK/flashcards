import { FC, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { formSchema } from '../config/validationConfig';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer } from 'react-toastify';
import CheckEmail from './checkEmail';
import ForgotPassword from './forgotPassword';

export interface IForgotPassword {
  email: string;
}

const Forgot: FC = () => {
  const [checkMainModal, setCheckMainModal] = useState(false);

  const methods = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formSchema),
  });

  return (
    <>
      <ToastContainer />
      <FormProvider {...methods}>
        {!checkMainModal && <ForgotPassword setCheckMainModal={setCheckMainModal} />}
        {checkMainModal && (
          <CheckEmail
            openModal={checkMainModal}
            setOpenModal={setCheckMainModal}
            email={methods.getValues('email')}
          />
        )}
      </FormProvider>
    </>
  );
};

export default Forgot;
