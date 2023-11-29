import { Button as ButtonRadix } from '@radix-ui/themes';
import { FC } from 'react';
import styles from '../styles/button.module.scss';
import clsx from 'clsx';

export interface IButton {
  variant: 'fill' | 'goust' | 'normal';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: FC<IButton> = ({ children, variant, onClick, type }) => {
  return (
    <ButtonRadix className={clsx(styles[variant], styles.button)} onClick={onClick} type={type}>
      {children}
    </ButtonRadix>
  );
};

export default Button;
