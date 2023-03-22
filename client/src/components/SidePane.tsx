import React, { FC } from 'react';
import { IPropsWithChildren } from '@/interfaces';
import { HeadingSecondary } from './Headings';

interface ISidePaneProps extends IPropsWithChildren {
  isLoading: boolean;
  title: string;
}

const SidePane: FC<ISidePaneProps> = ({ children, isLoading, title }) => {
  return (
    <aside className='w-[250px]'>
      <HeadingSecondary>{title}</HeadingSecondary>
      {
        isLoading
          ? (
            <div className='w-full flex justify-center'>
              <div className='border-b w-32 h-32 rounded-full border-violet-300 animate-spin' />
            </div>
          )
          : (
            <>{children}</>
          )
      }
    </aside>
  );
};

export default SidePane;