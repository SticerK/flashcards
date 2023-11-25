
import { object, string, ref, ObjectSchema, InferType } from 'yup';



export interface ILoginFields {
    password: string
    email: string
}

export const formSchema = object({
    password: string()
        .required("Password is required"),
    email: string().email('The entered email address is incorrect').required("Email Address is required")
});

export interface LoginForm extends InferType<typeof formSchema> {
    password: string
    email: string
}