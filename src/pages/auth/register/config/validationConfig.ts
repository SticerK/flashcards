
import { object, string, ref, ObjectSchema } from 'yup';



export interface IRegisterFields {
    password: string
    passwordConfirm: string
    email: string
}

export const formSchema: ObjectSchema<IRegisterFields> = object({
    password: string()
        .required("Password is required"),
    passwordConfirm: string()
        .required("Confirm Password is required")
        .oneOf([ref("password")], "Passwords do not match"),
    email: string().email('The entered email address is incorrect').required("Email Address is required")
});

