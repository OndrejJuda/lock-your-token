import React, { useState, FormEvent, } from 'react';
import { Button, Input, SidePane } from './';
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
    <SidePane isLoading={isLoading} title='Create new envelope'>
      <form
        className='flex flex-col gap-4'
        onSubmit={submitHandler}
      >
        <Input id='title' title='Title' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input id='date' title='Date' type='date' value={date} onChange={(e) => setDate(e.target.value)} />
        <Button type='submit'>Add</Button>
      </form>
    </SidePane>
  );
};

export default NewEnvelope;