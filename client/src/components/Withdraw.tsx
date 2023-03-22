import React, { useState } from 'react';
import { Button, SidePane } from './';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getEnvelopes, withdraw } from '@/utils';
import { setEnvelopes } from '@/store/userSlice';
import { setWithdrawId } from '@/store/appSlice';

const Withdraw = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { ethereum, withdrawId } = useAppSelector((state) => state.app);
  const { address } = useAppSelector((state) => state.user);

  const confirmHandler = async () => {
    if (!ethereum || !address || !withdrawId) return;
    setIsLoading(true);
    const response = await withdraw(ethereum, withdrawId);
    if (response) {
      dispatch(setWithdrawId(''));
      const envelopes = await getEnvelopes(ethereum, address);
      dispatch(setEnvelopes(envelopes));
    }
    setIsLoading(false);
  }

  return (
    <SidePane isLoading={isLoading} title='Withdraw'>
      <p className='text-lg mb-8'>Do you wish to withraw envelope with id {withdrawId}?</p>
      <div className='flex gap-2'>
        <Button full onClick={confirmHandler}>Yes</Button>
        <Button full secondary onClick={() => dispatch(setWithdrawId(''))}>No</Button>
      </div>
    </SidePane>
  );
};

export default Withdraw;