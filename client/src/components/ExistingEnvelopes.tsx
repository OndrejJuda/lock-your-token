import React from 'react';
import { Button } from './';
import { useAppSelector } from '@/hooks';

const ExistingEnvelopes = () => {
  const envelopes = useAppSelector((state) => state.user.envelopes);

  console.log('envelopes:', envelopes);


  return (
    <div>
      <ul className='flex flex-col'>
        {
          envelopes.map(({ name, id, amount, lockEnd, }) => (
            <li className='flex items-center gap-4 bg-slate-500 p-4 m-4 rounded-md'>
              <div className='grid grid-cols-3 gap-4 mr-auto w-full'>
                <p>{name} ({id})</p>
                <p>{amount} ETH</p>
                <p>{lockEnd.toLocaleString()}</p>
              </div>
              <Button>Deposit</Button>
              <Button>Withdraw</Button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ExistingEnvelopes;