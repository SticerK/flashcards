
import { object, string, ref, ObjectSchema } from 'yup';



export interface IForgotPasswordFields {
    email: string
}

export const formSchema: ObjectSchema<IForgotPasswordFields> = object({
    email: string().email('The entered email address is incorrect').required("Email Address is required")
});