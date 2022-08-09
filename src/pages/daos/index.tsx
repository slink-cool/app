import { DaoCard, fetchDaosList, SWR_DAOS_LIST_KEY } from '@entities/dao';
import { EMPTY_ARR } from '@shared/defaults';
import { PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';

const DaosPage: NextPage = () => {
  const router = useRouter();
  const { data = EMPTY_ARR, isLoading } = useSWR(
    SWR_DAOS_LIST_KEY,
    fetchDaosList
  );

  return (
    <>
      <PageHeader title="DAOs" goBack={router.back} />
      <div className="container grid grid-cols-8 gap-6 px-24">
        {isLoading &&
          [...Array(16)].map((dao) => (
            <div key={dao} className="col-span-4 overflow-hidden rounded-xl">
              <div className="h-[120px] animate-pulse bg-primary" />
            </div>
          ))}
        <Link href={{ pathname: '/daos/delink' }}>
          <div className="col-span-4">
            <DaoCard
              title={'DELINK (🕸) Solana Summer Hackathon'}
              description={'TALENT PLATFORM FOR WEB3 PROFESSIONALS 🌐'}
              avatarUrl={
                'https://pbs.twimg.com/profile_images/1555477660989591552/MV_ZptiR_400x400.png'
              }
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
