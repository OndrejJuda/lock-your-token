import { Header, NewEnvelope, ExistingEnvelopes, Navbar } from '@/components';
import { useAppSelector } from '@/hooks';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const showNew = useAppSelector((state) => state.app.showNew);

  return (
    <div className='bg-slate-900 text-violet-50 min-h-screen max-h-screen flex flex-col'>
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
          <ExistingEnvelopes />
        </div>
      </main>
    </div>
  )
};
