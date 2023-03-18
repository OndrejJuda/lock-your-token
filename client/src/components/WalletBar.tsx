import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button } from './';
import { setAddress } from '@/store/userSlice';
import { MdContentCopy } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';
import { sleep } from '@/utils';
import Blockies from 'react-blockies';

const WalletBar = () => {
  const [isCopied, setIsCopied] = useState(false);
  const dispatch = useAppDispatch();
  const { ethereum } = useAppSelector((state) => state.app);
  const { address } = useAppSelector((state) => state.user);

  const connectHandler = async () => {
    try {
      await ethereum?.request({ method: 'eth_requestAccounts' });
      const accounts = await ethereum?.request({ method: 'eth_accounts' });
      let account: string | undefined;
      if (typeof accounts === 'string') {
        account = accounts;
      } else if (Array.isArray(accounts) && accounts.length > 0) {
        account = accounts[0];
      }

      if (account) {
        dispatch(setAddress(account));
      } else {

      }
    } catch (error) {

    }
  }

  const copyHandler = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setIsCopied(true);
      await sleep(500);
      setIsCopied(false);
    } catch (error) {

    }
  };

  return (
    <>
      {
        address && (
          <div className='bg-violet-900 p-4 rounded-md shadow-md flex items-center gap-2'>
            <Blockies 
              seed={address}
              className='rounded-lg'
              size={7}
              scale={4}
            />
            <span title={address}>{address.slice(0, 7)}...{address.slice(-4)}</span>
            <span className='flex justify-center items-center w-[18px] h-[18px]'>
              {
                isCopied
                  ? (
                    <BiLike className='text-[18px]' />
                  )
                  : (
                    <MdContentCopy
                      className='cursor-pointer hover:text-violet-300'
                      title='Copy'
                      onClick={copyHandler}
                    />
                  )
              }
            </span>
          </div>
        )
      }
      {
        !address && (
          <div className='py-2'>
            {
              ethereum && (
                <Button onClick={connectHandler}>Connect</Button>
              )
            }
            {
              ethereum === null && (
                <Button>
                  <a href='https://metamask.io/download/' target='_blank' rel='noopener noreferrer'>Install Metamask</a>
                </Button>
              )
            }
          </div>
        )
      }
    </>
  );
};

export default WalletBar;