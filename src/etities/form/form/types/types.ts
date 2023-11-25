import { IForgotPassword } from "pages/auth/forgotPassword/ui/forgotPassword";
import { ILoginFields, LoginForm } from "pages/auth/login/config/validationConfig";
import { IRegisterFields } from "pages/auth/register/config/validationConfig";
import { ObjectSchema } from "yup";

export interface FormValidation {
    [key: string]: LoginForm
}