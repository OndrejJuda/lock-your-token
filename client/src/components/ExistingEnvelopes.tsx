import React from 'react';
import { Button } from './';

const ExistingEnvelopes = () => {
  return (
    <div>
      <ul className='flex flex-col'>
        <li className='flex'>
          <p>Name (id)</p>
          <p>Amount</p>
          <p>Lock end</p>
          <Button>Deposit</Button>
          <Button>Withdraw</Button>
        </li>
      </ul>
    </div>
  );
};

export default ExistingEnvelopes;