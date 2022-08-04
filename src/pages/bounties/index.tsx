import { BountieCard } from '@entities/bounties';
import { PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const BountiesPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="container sticky top-0 mb-4 border-b border-dark-300 bg-dark-500 px-24  py-4">
        <PageHeader title="Bounties" goBack={router.back} />
      </div>
      <div className="container grid grid-cols-8 gap-6 px-24">
        <div className="col-span-2">
          <BountieCard
            daoTitle={'Tigga'}
            daoPublished={'Aug 11, 2022'}
            bountieTag={'Community'}
            bountieTitle={'Discord Growth Consulting'}
            bountieReward={'1500 USDT'}
            sourceUrl={''}
          />
        </div>
      </div>
    </>
  );
};

export default BountiesPage;
