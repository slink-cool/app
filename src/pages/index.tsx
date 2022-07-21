import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { WalletButton } from '@entities/wallet';
import { Sidebar } from '@widgets/Sidebar';

const Home: NextPage = () => {
  return (
    <div className="container">
      <Sidebar />
    </div>
  );
};

export default Home;
