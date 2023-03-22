import React from 'react';
import { Button, HeadingSecondary } from './';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setDepositToId, setWithdrawId } from '@/store/appSlice';

const ExistingEnvelopes = () => {
  const envelopes = useAppSelector((state) => state.user.envelopes);
  const dispatch = useAppDispatch();

  return (
    <div className='flex-1'>
      <HeadingSecondary>My envelopes</HeadingSecondary>
      <ul className={`flex flex-col h-full gap-4 overflow-y-auto`}>
        {
          envelopes.map(({ title, id, amount, lockEnd, isWithdrawn }) => (
            <li
              key={id}
              className={`flex items-center gap-4 bg-slate-800 p-4 rounded-md  ${isWithdrawn ? '' : 'shadow-md transition hover:bg-slate-700'}`}
            >
              <div className='grid grid-cols-[min-content_1fr_1fr_1fr] gap-4 mr-auto w-full'>
                <p>({id})</p>
                <p>{title}</p>
                <p>{amount} ETH</p>
                <p>{lockEnd.toLocaleDateString('en-US')}</p>
              </div>
              <Button disabled={isWithdrawn} onClick={() => dispatch(setDepositToId(id))}>Deposit</Button>
              <Button disabled={lockEnd > new Date() || isWithdrawn} onClick={() => dispatch(setWithdrawId(id))}>Withdraw</Button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

export default ExistingEnvelopes;