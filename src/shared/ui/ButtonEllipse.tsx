import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ButtonEllipse: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className="text-accent rounded-full bg-light-500 p-2 text-accent-500 shadow-md"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonEllipse;
