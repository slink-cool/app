import { Avatar, fetchDao, SWR_DAO_KEY } from '@entities/dao';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import React from 'react';

const DaosPage: NextPage = () => {
  const { query } = useRouter();

  const daoId = (query.id as string) || DEFAULT_PUBLIC_KEY_STR;
  const symbol = (query.id as string) || DEFAULT_PUBLIC_KEY_STR;

  const { data: daoInfo, isLoading: isLoadingDaoInfo } = useSWR(
    [SWR_DAO_KEY, daoId, symbol],
    ([_, daoId, symbol]) => fetchDao(daoId, symbol)
  );

  return (
    <div className="container grid grid-cols-8 gap-6 px-24">
      <div className="col-span-full mt-8 h-fit overflow-hidden rounded-xl bg-primary pb-8">
        <div className="h-44 bg-[#D3EDFF]" />
        <div className="flex flex-col px-6">
          <div className="-mt-16 mb-2">
            <Avatar
              imgUrl={daoInfo?.logoUrl}
              title={daoInfo?.displayName || daoId}
            />
          </div>
          <span className="mb-2 text-xl font-bold">{daoInfo?.displayName}</span>
          <span className="text-sm text-light-300">{daoInfo?.symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default DaosPage;
