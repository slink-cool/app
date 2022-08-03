import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  as?: 'button' | 'a';
  href?: string;
}

const Button = React.forwardRef<any, ButtonProps>(
  ({ title, variant = 'primary', onClick, as = 'button', href }, ref) => {
    let Comp: React.ElementType = as;
    return (
      <Comp
        ref={ref}
        href={href}
        onClick={onClick}
        className={clsx(
          'rounded-md py-3 px-4 text-sm font-semibold leading-4 transition',
          {
            'bg-accent-500 hover:bg-accent-400': variant === 'primary',
            'bg-dark-300 hover:bg-dark-200': variant === 'secondary',
          }
        )}
      >
        {title}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export default Button;
