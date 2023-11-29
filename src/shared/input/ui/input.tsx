import { FC, useState } from 'react';
import styles from '../styles/input.module.scss';
import { Text, TextField } from '@radix-ui/themes';
import { ExclamationTriangleIcon, EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

interface IInput {
  type: 'text' | 'password';
  placeholder?: string;
  labelName: string;
  value: string;
  onChange: () => void;
  errorMessage?: string;
}

const Input: FC<IInput> = ({ type, placeholder, labelName, value, onChange, errorMessage }) => {
  const [typeInput, setTypeInput] = useState(type);

  return (
    <label className={styles.label}>
      <Text as='div' size='2' className={styles.label}>
        {labelName}
      </Text>
      <TextField.Input
        type={typeInput}
        placeholder={placeholder}
        className={styles.input}
        onChange={onChange}
        value={value}
      />
      {type === 'password' && (
        <div className={styles.passwordShow}>
          {typeInput === 'text' ? (
            <EyeClosedIcon onClick={() => setTypeInput('password')} />
          ) : (
            <EyeOpenIcon onClick={() => setTypeInput('text')} />
          )}
        </div>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>
          <ExclamationTriangleIcon />
          <p className={styles.errorLabel}>{errorMessage}</p>
        </div>
      )}
    </label>
  );
};

export default Input;
