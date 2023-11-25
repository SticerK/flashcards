import { FC, useState } from 'react'
import InputForm from 'etities/form/input/ui/form.Input'
import { InputProps } from 'etities/form/types'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

const PasswordForm: FC<InputProps> = (props) => {

    const [showPassword, setShowPassword] = useState(false)

    let icon = showPassword ? (
        <EyeClosedIcon onClick={() => setShowPassword((prev) => !prev)} />
    ) : (
        <EyeOpenIcon onClick={() => setShowPassword((prev) => !prev)} />
    )


    return <InputForm {...props} icon={icon} type={showPassword ? 'text' : 'password'} />
}

export default PasswordForm