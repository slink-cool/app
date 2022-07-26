import '@solana/wallet-adapter-react-ui/styles.css';
import '../styles/globals.css';

import { requestAccessToken } from '@features/auth/api';
import { WalletToken } from '@shared/auth-utils';
import { supabase } from '@shared/supabase';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { Sidebar } from '@widgets/Sidebar';
import { decodeJwt } from 'jose';
import type { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';

function App({ Component, pageProps }: AppProps) {
  const wallet = useWallet();

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey || !wallet.signMessage) return;

    const cookies = parseCookies();
    const accessToken = cookies['sb-access-token'];
    if (accessToken) {
      const jwtTokenParsed = decodeJwt(accessToken);
      if (
        jwtTokenParsed &&
        jwtTokenParsed.sub === wallet.publicKey.toBase58()
      ) {
        supabase.auth.setAuth(accessToken);
        return;
      }
    }

    WalletToken.new(wallet.publicKey, wallet.signMessage).then((jwt) => {
      requestAccessToken(jwt.toString()).then(({ token }) =>
        supabase.auth.setAuth(token)
      );
    });
  }, [wallet]);

  return (
    <div className="flex flex-row bg-[#16131A] text-white">
      <div className="h-screen w-80 bg-primary">
        <Sidebar />
      </div>
      <main className="container px-24">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

const solanaRpcUrl = 'http://localhost:8899';
const wallets = [new PhantomWalletAdapter()];

function Main(props: AppProps) {
  return (
    <ConnectionProvider endpoint={solanaRpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <App {...props} />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default Main;
