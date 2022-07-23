import { Token } from '@shared/auth-utils';
import { supabase } from '@shared/supabaseClient';
import { useWallet } from '@solana/wallet-adapter-react';
import { Sidebar } from '@widgets/Sidebar';
import type { NextPage } from 'next';
import { useEffect } from 'react';

const Home: NextPage = (props) => {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey || !wallet.signMessage) return;

    Token.new(wallet.publicKey, wallet.signMessage).then((jwt) => {
      fetch('/api/genToken', {
        body: jwt.toString(),
        method: 'POST',
      })
        .then((res) => res.text())
        .then((token) => {
          return supabase.auth.setAuth(token);
        });
    });
  }, [wallet]);

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange((ev, sess) => {
      console.log('test');

      supabase
        .from('user')
        .select()
        .eq('id', 'FnUaaRXXAdV1Y4RHD2k9BUwRXBtHuyTWrMK6HHtqKaEq')
        .then((res) => console.log(res));
      supabase
        .from('user')
        .update({ test: '2228' })
        .eq('id', wallet.publicKey?.toString())
        .then((res) => console.log(res));
    });
    return () => sub.data?.unsubscribe();
  }, [wallet.publicKey]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="container px-24">
        <main className="grid-cols-8">
          <div className="mt-8 h-[348px] col-span-8 bg-primary rounded-xl overflow-hidden mb-10">
            <div className="h-1/2 bg-[#D3EDFF]" />
            <div className="px-6">
              <div className="bg-[#D3EDFF] rounded-full w-32 aspect-square border-4 border-[#201D24] -mt-16 flex justify-center items-center mb-2">
                <span className="text-6xl text-[#819CAF]">
                  {wallet.publicKey?.toString()[0]}
                </span>
              </div>
              <span>{wallet.publicKey?.toString()}</span>
            </div>
          </div>
          <div className="grid-cols-8 bg-primary h-[200px] rounded-xl overflow-hidden"></div>
        </main>
      </div>
    </div>
  );
};

export default Home;
