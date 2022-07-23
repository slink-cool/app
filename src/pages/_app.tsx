import '@solana/wallet-adapter-react-ui/styles.css';
import '../styles/globals.css';

import { supabase } from '@shared/supabase';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {
  ConnectionProvider,
  useWallet,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { Sidebar } from '@widgets/Sidebar';
import jwt from 'jsonwebtoken';
import type { AppProps } from 'next/app';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import { WalletToken } from '@shared/auth-utils';
import { requestAccessToken } from '@features/auth/api';

function App({ Component, pageProps }: AppProps) {
  const wallet = useWallet();

  useEffect(() => {
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
      requestAccessToken(jwt.toString()).then(({ token }) =>
        supabase.auth.setAuth(token)
      );
    });
  }, [wallet]);

  return (
    <div className="flex flex-row">
      <Sidebar />
      <main className="container grid-cols-8 px-24">
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
