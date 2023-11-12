import { FC, useState } from 'react';
import styles from '../inputs.module.scss';
import { Text, TextField } from '@radix-ui/themes';
import { ExclamationTriangleIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { InputProps } from '../types';

const InputPassword: FC<InputProps> = ({
  labelName,
  placeholder,
  register,
  errors,
  watch,
  isConfirm,
  registerName,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <label className={styles.label}>
      <Text as='div' size='2' mt='5' className={styles.label}>
        {labelName}
      </Text>
      <TextField.Input
        placeholder={placeholder}
        className={styles.input}
        type={showPassword ? 'text' : 'password'}
        {...register(registerName, {
          required: 'Password is required',
          validate: (val: string) => {
            if (isConfirm && watch('password') != val) {
              return 'Your passwords do no match';
            }
          },
        })}
      />
      <div className={styles.passwordShow}>
        {showPassword ? (
          <EyeClosedIcon onClick={() => setShowPassword((prev) => !prev)} />
        ) : (
          <EyeOpenIcon onClick={() => setShowPassword((prev) => !prev)} />
        )}
      </div>
      {errors[registerName] && (
        <div className={styles.errorMessage}>
          <ExclamationTriangleIcon />
          <p className={styles.errorLabel}>{errors[registerName]?.message}</p>
        </div>
      )}
    </label>
  );
};

export default InputPassword;
