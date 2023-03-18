import { useAppDispatch } from '@/hooks';
import React from 'react';
import { setShowExisting } from '../store/appSlice';
import { Button } from './';

const ModeSwitcher = () => {
  const dispatch = useAppDispatch();

  return (
    <div className='flex'>
      <Button onClick={() => dispatch(setShowExisting(false))}>New</Button>
      <Button onClick={() => dispatch(setShowExisting(true))}>Existing</Button>
    </div>
  );
};

export default ModeSwitcher;