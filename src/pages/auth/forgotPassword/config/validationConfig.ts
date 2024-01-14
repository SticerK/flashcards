import { object, string, ObjectSchema } from 'yup';
import { IForgotPasswordForm } from '../ui/forgotPassword';

export const formSchema: ObjectSchema<IForgotPasswordForm> = object({
  email: string()
    .email('The entered email address is incorrect')
    .required('Email Address is required'),
});
