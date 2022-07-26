import { useWallet } from '@solana/wallet-adapter-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const wallet = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!wallet.connected || !wallet.publicKey) return;

    router.replace({
      pathname: '/profiles/[id]',
      query: { id: wallet.publicKey.toString() },
    });
  }, [router, wallet]);

  return (
    <>
      <Head>
        <title>Slink</title>
      </Head>
    </>
  );
};

export default Home;
