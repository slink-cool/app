import { DaoCard, fetchDaosList, SWR_DAOS_LIST_KEY } from '@entities/dao';
import { EMPTY_ARR } from '@shared/defaults';
import { NextPage } from 'next';
import useSWR from 'swr';

const DaosPage: NextPage = () => {
  const { data = EMPTY_ARR } = useSWR(SWR_DAOS_LIST_KEY, fetchDaosList);

  return (
    <div className="py-16">
      <h1 className="mb-4">DAOs</h1>
      <div className="grid grid-cols-8 gap-6">
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
    </div>
  );
};

export default DaosPage;
