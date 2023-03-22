import React, { FC, ChangeEvent } from 'react';

export const Input: FC<{ id: string, title: string, type: string, value?: string | number, onChange: (e: ChangeEvent<HTMLInputElement>) => void, labelWidth?: string }> = ({ id, title, type, value, onChange, labelWidth }) => (
  <div className={`grid grid-cols-[${labelWidth ? labelWidth : '50px'}_1fr]`}>
    <label
      htmlFor={id}
      className='text-lg'
    >
      {title}
    </label>
    <input
      type={type}
      name={id}
      id={id}
      className='flex-1 bg-violet-900 rounded-md px-2'
      style={{ colorScheme: 'dark' }}
      value={value}
      onChange={onChange}
    />
  </div>
);
