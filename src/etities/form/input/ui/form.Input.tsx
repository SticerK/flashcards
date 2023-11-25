import { FC } from 'react'
import { Form } from '../../index'
import styles from '../styles/input.module.scss'
import { Text, TextField } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { useFormContext } from 'react-hook-form'
import { InputProps } from 'etities/form/types'


const InputForm: FC<InputProps> = ({ placeholder, labelName, registerName, icon, type }) => {

  const { register, formState: { errors } } = useFormContext()

  return (<label className={styles.label}>
    <Text as='div' size='2' className={styles.label}>
      {labelName}
    </Text>
    <TextField.Input
      type={type}
      placeholder={placeholder}
      className={styles.input}
      {...register(registerName)}
    />
    <div className={styles.passwordShow}>
      {icon}
    </div>
    {errors[registerName] && (
      <div className={styles.errorMessage}>
        <ExclamationTriangleIcon />
        <p className={styles.errorLabel}>{errors[registerName]?.message}</p>
      </div>
    )}
  </label>)
}

export default InputForm