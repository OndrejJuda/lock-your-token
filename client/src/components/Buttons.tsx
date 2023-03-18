import React, { FC, MouseEvent } from 'react';
import { IPropsWithChildren } from '@/interfaces';

interface IButtonProps extends IPropsWithChildren {
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({ children, onClick, disabled, type }) => {
  return (
    <button
      disabled={disabled}
      type={type ?? 'button'}
      className='shadow-md p-2 rounded-md uppercase font-semibold
      bg-violet-900
      transition
      hover:scale-105 hover:bg-violet-700
      active:scale-95 active:bg-violet-700
      disabled:scale-95 disabled:shadow-none disabled:bg-slate-600'
      onClick={onClick}
    >
      {children}
    </button>
  )
};