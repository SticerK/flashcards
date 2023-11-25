import { FC } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterInputs } from 'pages/auth/register/ui/register';

export interface IForm {
  validateRules: any;
  handleSubmit: (x: any) => void;
}

const Form: FC<React.PropsWithChildren<IForm>> = ({ children, validateRules, handleSubmit }) => {
  const methods = useForm({
    mode: 'onBlur',
    resolver: yupResolver(validateRules),
  });

  const onSubmit = (e: SubmitHandler<RegisterInputs>): void => {
    handleSubmit(e);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default Form;
