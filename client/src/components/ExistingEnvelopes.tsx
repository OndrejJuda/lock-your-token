import React from 'react';
import { Button, HeadingSecondary } from './';
import { useAppSelector } from '@/hooks';

const ExistingEnvelopes = () => {
  const envelopes = useAppSelector((state) => state.user.envelopes);

  return (
    <div className='flex-1'>
      <HeadingSecondary>My envelopes</HeadingSecondary>
      <ul className={`flex flex-col h-full gap-4 overflow-y-auto`}>
        {
          envelopes.map(({ name, id, amount, lockEnd, }) => (
            <li
              key={id}
              className='flex items-center gap-4 bg-slate-800 shadow-md p-4 rounded-md transition hover:bg-slate-700'
            >
              <div className='grid grid-cols-3 gap-4 mr-auto w-full'>
                <p>{name} ({id})</p>
                <p>{amount} ETH</p>
                <p>{lockEnd.toLocaleDateString('en-US')}</p>
              </div>
              <Button>Deposit</Button>
              <Button disabled={id !== 3}>Withdraw</Button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ExistingEnvelopes;