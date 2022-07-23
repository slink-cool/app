import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  title: string;
  kind?: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button = ({ title, kind = 'primary', onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx('rounded-md py-3 px-4 text-sm font-semibold leading-4', {
        'bg-accent': kind === 'primary',
        'bg-dark-300': kind === 'secondary',
      })}
    >
      {title}
    </button>
  );
};

export default Button;
