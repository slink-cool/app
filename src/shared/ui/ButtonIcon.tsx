import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  as?: 'button' | 'a';
  variant?: 'primary' | 'secondary';
}

const ButtonIcon = React.forwardRef<any, ButtonProps>(
  ({ children, onClick, variant = 'primary', href, as = 'button' }, ref) => {
    let Comp: React.ElementType = as;
    return (
      <Comp
        ref={ref}
        onClick={onClick}
        href={href}
        className={clsx('rounded-md p-3 transition', {
          'bg-accent-500 hover:bg-accent-400': variant === 'primary',
          'bg-dark-300 hover:bg-dark-200': variant === 'secondary',
        })}
      >
        {children}
      </Comp>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
