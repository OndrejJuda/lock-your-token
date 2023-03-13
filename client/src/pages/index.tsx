import { Navbar, NewEnvelope, ExistingEnvelopes, ModeSwitcher } from '@/components';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const isNew = false;

  return (
    <>
      <Navbar />
      <main >
        <div>
          <ModeSwitcher />
          {
            isNew
              ? (
                <NewEnvelope />
              )
              : (
                <ExistingEnvelopes />
              )
          }
        </div>
      </main>
    </>
  )
};
