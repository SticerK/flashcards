

export interface InputProps {
  labelName: string;
  type?: string
  placeholder: string;
  isConfirm?: boolean;
  registerName: string;
  icon?: React.ReactElement
}

export interface IPasswordInput extends InputProps {
  setChange: () => void
}
