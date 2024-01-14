import { boolean, object, string } from 'yup';

export const editPackSchema = object({
  name: string().required('This field is required'),
  isPrivate: boolean().required(),
});
