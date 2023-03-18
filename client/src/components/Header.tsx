import React from 'react';
import { WalletBar } from '.';

const Header = () => {
  return (
    <header className='flex justify-between items-center p-4'>
      <span className='text-3xl font-bold'>LOYOTOS</span>
      <WalletBar />
    </header>
  );
};

export default Header;