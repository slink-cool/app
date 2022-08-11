import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonEllipse: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="text-accent rounded-full bg-light-500 p-2 text-dark-500 shadow-md transition hover:bg-accent-500 hover:text-dark-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonEllipse;
