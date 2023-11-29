import { boolean, object, string } from 'yup';

export const formSchema = object({
  password: string().required('Password is required'),
  email: string()
    .email('The entered email address is incorrect')
    .required('Email Address is required'),
  rememberMe: boolean(),
});
