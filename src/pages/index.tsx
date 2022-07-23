import { WalletToken } from '@shared/auth-utils';
import { supabase } from '@shared/supabase';
import { useWallet } from '@solana/wallet-adapter-react';
import { Sidebar } from '@widgets/Sidebar';
import type { NextPage } from 'next';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

const Home: NextPage = (props) => {
  const wallet = useWallet();

  useEffect(
    function requestAccessToken() {
      if (!wallet.connected || !wallet.publicKey || !wallet.signMessage) return;

      const cookies = parseCookies();
      const accessToken = cookies['sb-access-token'];
      if (accessToken) {
        const jwtTokenParsed = jwt.decode(accessToken, { json: true });
        if (
          jwtTokenParsed &&
          jwtTokenParsed.sub === wallet.publicKey.toBase58()
        ) {
          supabase.auth.setAuth(accessToken);
          return;
        }
      }

      WalletToken.new(wallet.publicKey, wallet.signMessage).then((jwt) => {
        fetch('/api/auth/access-token', {
          body: jwt.toString(),
          method: 'POST',
        })
          .then((res) => res.json())
          .then(({ token }) => supabase.auth.setAuth(token));
      });
    },
    [wallet]
  );

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
