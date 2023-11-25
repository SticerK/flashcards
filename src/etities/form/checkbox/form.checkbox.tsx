import { Checkbox } from '@radix-ui/themes'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

export interface ICheckboxForm {
  registerName: string
}

const CheckboxForm: FC<ICheckboxForm> = ({ registerName }) => {
  const { register, setValue } = useFormContext()

  return <Checkbox
    {...register(registerName)}
    onCheckedChange={(e) => setValue(registerName, e)}
  />
}

export default CheckboxForm
