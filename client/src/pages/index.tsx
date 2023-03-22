import { useEffect } from 'react';
import { Header, NewEnvelope, ExistingEnvelopes, Navbar, Deposit, Withdraw } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Inter } from 'next/font/google';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { setEthereum } from '@/store/appSlice';
import { setEnvelopes } from '@/store/userSlice';
import { connectHandler, getEnvelopes } from '@/utils';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const dispatch = useAppDispatch();
  const { showNew, ethereum, depositToId, withdrawId } = useAppSelector((state) => state.app);
  const { address } = useAppSelector((state) => state.user);

  useEffect(() => {
    const ethereum: MetaMaskInpageProvider | undefined = window.ethereum;
    dispatch(setEthereum(ethereum && ethereum.isMetaMask ? ethereum : null));
  }, []);

  useEffect(() => {
    if (!ethereum) return;
    if (!address) {
      (async () => {
        await connectHandler(ethereum, dispatch);
      })();
      return;
    }
    (async () => {
      try {
        const envelopes = await getEnvelopes(ethereum, address);
        dispatch(setEnvelopes(envelopes));
      } catch (error) {
        console.log(error)
      }
    })();
  }, [ethereum, address]);

  const accountChangedHandler = async (input: any) => {
    console.log('\naccounts changed');

    const accounts = input as string[];
    console.log('accounts:', accounts);
    console.log(process.env.NEXT_PUBLIC_LOYOTOS_CONTRACT_ADDRESS);
  }

  return (
    <div className='bg-slate-900 text-violet-50 min-h-screen max-h-screen flex flex-col relative'>
      <Header />
      <main className='flex-1 max-h-full overflow-hidden flex justify-center items-stretch p-4'>
        <div className={`w-full max-h-full p-4 flex items-stretch shadow-md rounded-md bg-slate-800 ${showNew && 'gap-4'}`}>
          <Navbar />
          <div className={`h-full w-px bg-slate-900 ${showNew || 'mx-4'}`} />
          {
            showNew && (
              <>
                <NewEnvelope />
                <div className={`h-full w-px bg-slate-900 ${showNew || 'mx-4'}`} />
              </>
            )
          }
          {
            depositToId && (
              <>
                <Deposit />
                <div className={`h-full w-px bg-slate-900 ${showNew || 'mx-4'}`} />
              </>
            )
          }
          {
            withdrawId && (
              <>
                <Withdraw />
                <div className={`h-full w-px bg-slate-900 ${showNew || 'mx-4'}`} />
              </>
            )
          }
          <ExistingEnvelopes />
        </div>
      </main>
    </div>
  )
};
