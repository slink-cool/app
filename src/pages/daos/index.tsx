import { DaoCard, fetchDaosList, SWR_DAOS_LIST_KEY } from '@entities/dao';
import { EMPTY_ARR } from '@shared/defaults';
import { PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import Head from 'next/head';

const DaosPage: NextPage = () => {
  const router = useRouter();
  const { data = EMPTY_ARR, isLoading } = useSWR(
    SWR_DAOS_LIST_KEY,
    fetchDaosList
  );

  return (
    <>
      <Head>
        <title>Slink — DAOs</title>
      </Head>
      <PageHeader title="DAOs" goBack={router.back} />
      <div className="container grid grid-cols-8 gap-6 px-24">
        {isLoading &&
          [...Array(16)].map((dao) => (
            <div key={dao} className="col-span-4 overflow-hidden rounded-xl">
              <div className="h-[120px] animate-pulse bg-primary" />
            </div>
          ))}
        <Link href={{ pathname: '/daos/slink' }}>
          <div className="col-span-4">
            <DaoCard
              title={'SLINK (🕸) Solana Summer Hackathon'}
              description={'TALENT PLATFORM FOR WEB3 PROFESSIONALS 🌐'}
              avatarUrl="/img/avatar.png"
            />
          </div>
        </Link>
        {data.map((dao) => (
          <Link
            key={dao.id}
            href={{ pathname: '/daos/[id]', query: { id: dao.id } }}
          >
            <div key={dao.id} className="col-span-4">
              <DaoCard
                title={dao.displayName || dao.symbol}
                description={dao.symbol}
                avatarUrl={dao.logoUrl}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default DaosPage;
