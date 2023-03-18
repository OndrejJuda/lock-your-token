import React, { FC, useState, FormEvent, ChangeEvent } from 'react';
import { Button, HeadingSecondary } from './';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setShowNew } from '@/store/appSlice';
import { createEnvelope, getEnvelopes } from '@/utils';
import { setEnvelopes } from '@/store/userSlice';

const NewEnvelope = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useAppDispatch();
  const { ethereum } = useAppSelector((state) => state.app);
  const { address } = useAppSelector((state) => state.user);

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


  const clearState = () => {
    setTitle('');
    setDate('');
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!ethereum || !address) return;
    setIsLoading(true);
    const seconds = +(new Date(date).getTime() / 1000).toFixed(0);
    const response = await createEnvelope(ethereum, seconds, title);
    if (response) {
      clearState();
      dispatch(setShowNew(false));
      const envelopes = await getEnvelopes(ethereum, address);
      dispatch(setEnvelopes(envelopes));
    }
    setIsLoading(false);
  };

  return (
    <div className='w-[250px]'>
      <HeadingSecondary>Create new envelope</HeadingSecondary>
      {
        isLoading
          ? (
            <div className='w-full flex justify-center'>
              <div className='border-b w-32 h-32 rounded-full border-violet-300 animate-spin' />
            </div>
          )
          : (
            <form
              className='flex flex-col gap-4'
              onSubmit={submitHandler}
            >
              <Input id='title' title='Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input id='date' title='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
              <Button type='submit'>Add</Button>
            </form>
          )
      }
    </div>
  );
};

const Input: FC<{ id: string, title: string, type: string, value?: string, onChange: (e: ChangeEvent<HTMLInputElement>) => void }> = ({ id, title, type, value, onChange }) => (
  <div className='grid grid-cols-[50px_1fr]'>
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

export default NewEnvelope;