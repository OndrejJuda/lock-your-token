import React, { FC, ReactNode } from 'react';

interface IButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const Button: FC<IButtonProps> = ({ children, onClick }) => {
  return (
    <button
      className='shadow-md p-2 rounded-md bg-slate-400 uppercase font-semibold'
      onClick={onClick}
    >
      {children}
    </button>
  )
};