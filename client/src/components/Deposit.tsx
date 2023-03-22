import React, { useState, FormEvent } from 'react';
import { Button, Input, SidePane } from './';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { depositToEnvelope, getEnvelopes } from '@/utils';
import { setEnvelopes } from '@/store/userSlice';
import { setDepositToId } from '@/store/appSlice';

const Deposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const dispatch = useAppDispatch();
  const { ethereum, depositToId } = useAppSelector((state) => state.app);
  const { address } = useAppSelector((state) => state.user);

  const clearState = () => {
    setAmount(0);
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (!ethereum || !address || !depositToId) return;
    setIsLoading(true);
    const response = await depositToEnvelope(ethereum, depositToId, amount);
    if (response) {
      clearState();
      dispatch(setDepositToId(''));
      const envelopes = await getEnvelopes(ethereum, address);
      dispatch(setEnvelopes(envelopes));
    }
    setIsLoading(false);
  };

  return (
    <SidePane isLoading={isLoading} title='Deposit'>
      <form
        className='flex flex-col gap-4'
        onSubmit={submitHandler}
      >
        <p className='text-lg'>Envelope Id: {depositToId}</p>
        <Input
          id='amount'
          onChange={(e) => setAmount(+e.target.value)}
          title='ETH'
          type='number'
          value={amount}
        />
        <Button type='submit'>Deposit</Button>
      </form>
    </SidePane>
  );
};

export default Deposit;