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
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function App({ Component, pageProps }: AppProps) {
  const wallet = useWallet();

  const [isWalletSigning, setIsWalletSigning] = useState(false);

  useEffect(() => {
    if (
      !wallet.connected ||
      !wallet.publicKey ||
      !wallet.signMessage ||
      isWalletSigning
    )
      return;

    setIsWalletSigning(true);
    try {
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
    } finally {
      setIsWalletSigning(false);
    }
  }, [wallet, isWalletSigning]);

  return (
    <div className="flex flex-row bg-dark-500 text-white">
      <div className="sticky top-0 h-screen w-80 border-r border-dark-300">
        <Sidebar userId={wallet.publicKey} />
      </div>
      <main className="w-full">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

const solanaRpcUrl =
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'http://localhost:8899';
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
