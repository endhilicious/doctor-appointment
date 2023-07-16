import React, { ReactNode, CSSProperties, MouseEventHandler, RefObject, ButtonHTMLAttributes } from 'react';
import styles from './styles.module.scss';

export interface ButtonInterface {
  children?: ReactNode,
  ref?: RefObject<HTMLButtonElement>,
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error',
  className?: string,
  color?: string,
  style?: CSSProperties,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  disabled?: boolean,
  type?: "submit" | "reset" | "button",
  onClick?: () => any;
}

const Button: React.FC<ButtonInterface> = (
  {
    children,
    ref,
    variant = 'primary',
    className,
    size = 'md',
    disabled = false,
    color = '#ffffff',
    style,
    onClick = () => {},
    type = 'button',
  } 
) => {
  const buttonClasses = [styles.button, styles[variant], styles[size], className].join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={buttonClasses}
      style={{ color, ...style }}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button;
