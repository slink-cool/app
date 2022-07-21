import { useWallet } from '@solana/wallet-adapter-react';
import { Sidebar } from '@widgets/Sidebar';
import type { NextPage } from 'next';
import { useCallback } from 'react';

const Home: NextPage = () => {
  const wallet = useWallet();

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="container px-24">
        <main className="grid-cols-8">
          <div className="mt-8 h-[348px] col-span-8 bg-primary rounded-xl overflow-hidden mb-10">
            <div className="h-1/2 bg-[#D3EDFF]" />
            <div className="px-6">
              <div className="bg-[#D3EDFF] rounded-full w-32 aspect-square border-4 border-[#201D24] -mt-16 flex justify-center items-center mb-2">
                <span className='text-6xl text-[#819CAF]'>{wallet.publicKey?.toString()[0]}</span>
              </div>
              <span>{wallet.publicKey?.toString()}</span>
            </div>
          </div>
          <div className='grid-cols-8 bg-primary h-[200px] rounded-xl overflow-hidden'>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
