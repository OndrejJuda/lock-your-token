import { IPropsWithChildren } from '@/interfaces';
import React, { FC } from 'react';

export const HeadingSecondary: FC<IPropsWithChildren> = ({ children }) => {
  return (
    <h2
      className='text-xl font-semibold mb-6'
    >
      {children}
    </h2>
  );
};
