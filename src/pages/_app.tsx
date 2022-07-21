import '../styles/globals.css';
import '@solana/wallet-adapter-react-ui/styles.css';

import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import type { AppProps } from 'next/app';

const solanaRpcUrl = 'http://localhost:8899';
const wallets = [new PhantomWalletAdapter()];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectionProvider endpoint={solanaRpcUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <Component {...pageProps} />
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
