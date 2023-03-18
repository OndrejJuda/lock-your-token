import { Navbar, NewEnvelope, ExistingEnvelopes, ModeSwitcher } from '@/components';
import { useAppSelector } from '@/hooks';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const showExisting = useAppSelector((state) => state.app.showExisting);

  return (
    <>
      <Navbar />
      <main >
        <div>
          <ModeSwitcher />
          {
            showExisting
              ? (
                <ExistingEnvelopes />
              )
              : (
                <NewEnvelope />
              )
          }
        </div>
      </main>
    </>
  )
};
