import React from 'react';
import { Button } from './';

const WalletBar = () => {
  const isConnected = false;

  return (
    <>
      {
        isConnected
          ? (
            <div>CONNECTED</div>
          )
          : (
            <Button>Connect</Button>
          )
      }
    </>
  );
};

export default WalletBar;