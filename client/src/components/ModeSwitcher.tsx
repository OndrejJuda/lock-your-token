import React from 'react';
import { Button } from './';

const ModeSwitcher = () => {
  return (
    <div className='flex'>
      <Button>New</Button>
      <Button>Existing</Button>
    </div>
  );
};

export default ModeSwitcher;