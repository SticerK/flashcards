import { object, string } from 'yup';

export const addCardSchema = object({
  answer: string().required('This field is required'),
  question: string().required('This field is required'),
});
