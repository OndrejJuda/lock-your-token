import React from 'react';
import { WalletBar } from '.';

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4'>
      <span className='text-5xl font-bold'>LO.YO.TOS</span>
      <WalletBar />
    </header>
  );
};

export default Header;