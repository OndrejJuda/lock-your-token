import React, { FC, ReactNode } from 'react';

interface IButtonProps {
  children?: ReactNode;
}

export const Button: FC<IButtonProps> = ({ children }) => {
  return (
    <button>{children}</button>
  )
};