import { boolean, object, string } from 'yup';

export const addPackSchema = object({
  name: string().required('This field is required'),
  isPrivate: boolean().required(),
});
