import { FC } from 'react';
import styles from '../inputs.module.scss';
import { Text, TextField } from '@radix-ui/themes';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { InputProps } from '../types';

const validateConfig = {
  email: {
    value: /^\S+@\S+\.\S+$/,
    message: 'The entered email address is incorrect',
  },
};

const DefaultInput: FC<InputProps> = ({
  register,
  labelName,
  placeholder,
  errors,
  registerName,
  errorText,
}) => {
  return (
    <label className={styles.label}>
      <Text as='div' size='2' className={styles.label}>
        {labelName}
      </Text>
      <TextField.Input
        placeholder={placeholder}
        className={styles.input}
        {...register(registerName, {
          required: errorText,
          pattern: registerName === 'email' ? validateConfig.email : false,
        })}
      />
      {errors[registerName] && (
        <div className={styles.errorMessage}>
          <ExclamationTriangleIcon />
          <p className={styles.errorLabel}>{errors[registerName]?.message}</p>
        </div>
      )}
    </label>
  );
};

export default DefaultInput;
