import { DaoCard, fetchDaosList, SWR_DAOS_LIST_KEY } from '@entities/dao';
import { EMPTY_ARR } from '@shared/defaults';
import { PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const DaosPage: NextPage = () => {
  const router = useRouter();
  const { data = EMPTY_ARR, isLoading } = useSWR(
    SWR_DAOS_LIST_KEY,
    fetchDaosList
  );

  return (
    <>
      <div className="container mb-4 border-b border-dark-300 px-24 py-4">
        <PageHeader title="DAOs" goBack={router.back} />
      </div>
      <div className="container grid grid-cols-8 gap-6 px-24">
        {isLoading &&
          [...Array(16)].map((it) => (
            <div key={it} className="col-span-4 overflow-hidden rounded-xl">
              <div className="h-[120px] animate-pulse bg-primary" />
            </div>
          ))}
        {data.map((it) => (
          <div key={it.id} className="col-span-4">
            <DaoCard
              title={it.displayName || it.symbol}
              description={it.symbol}
              avatarUrl={it.logoUrl}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DaosPage;
