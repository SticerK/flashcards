import { Button as ButtonRadix } from '@radix-ui/themes';
import { FC } from 'react';
import styles from '../styles/button.module.scss';
import clsx from 'clsx';

export interface IButton {
  variant: 'fill' | 'ghost' | 'normal';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  visible?: boolean;
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
}

const Button: FC<IButton> = ({
  children,
  variant,
  onClick,
  type,
  className,
  visible = true,
  radius = 'none',
}) => {
  return (
    visible && (
      <ButtonRadix
        radius={radius}
        className={clsx(styles[variant], styles.button, className)}
        onClick={onClick}
        type={type}>
        {children}
      </ButtonRadix>
    )
  );
};

export default Button;
