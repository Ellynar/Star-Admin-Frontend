import React from 'react';
import '../scss/components/_button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'lg';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size, className, ...rest }) => {
  const classNames = [
    'btn',
    `btn-${variant}`,
    size ? `btn-${size}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export default Button;
