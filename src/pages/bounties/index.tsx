import { BountieCard } from '@entities/bounties';
import { PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const BountiesPage: NextPage = () => {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Bounties" goBack={router.back} />
      <div className="container grid grid-cols-8 gap-6 px-24">
        <div className="col-span-2">
          <BountieCard
            avatarUrl={
              'https://stakingcrypto.info/static/assets/coins/solana-logo.png?v=34'
            }
            daoTitle={'Solana'}
            daoPublished={'May 31, 2022'}
            bountieTag={'Development'}
            bountieTitle={
              'Build a Solana + Filecoin/IPFS Project for the Bangalore Hacker House'
            }
            bountieReward={'$3000 USDC'}
            sourceUrl={
              'https://superteam.fun/bounties/build-a-solana-filecoinipfs-project-for-the-bangalore-hacker-house'
            }
          />
        </div>
        <div className="col-span-2">
          <BountieCard
            avatarUrl={
              'https://pbs.twimg.com/profile_images/1493136166975160328/S_HMX8bX_400x400.jpg'
            }
            daoTitle={'Crowdpad'}
            daoPublished={'May 28, 2022'}
            bountieTag={'Research'}
            bountieTitle={'Crowdpad Deep Dive'}
            bountieReward={'$1000 USDC'}
            sourceUrl={'https://superteam.fun/bounties/crowdpad-deep-dive'}
          />
        </div>
        <div className="col-span-2">
          <BountieCard
            avatarUrl={
              'https://blog.coindcx.com/wp-content/uploads/2021/09/ProfilePic.svg'
            }
            daoTitle={'CoinDCX'}
            daoPublished={'May 1, 2022'}
            bountieTag={'Research'}
            bountieTitle={'Evaluating Web3 Projects Deep Dive'}
            bountieReward={'$700 USDC'}
            sourceUrl={
              'https://superteam.fun/bounties/coindcx-deep-dive-bounty'
            }
          />
        </div>
        <div className="col-span-2">
          <BountieCard
            avatarUrl={
              'https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/5bf07e40-81d8-42ec-a060-5a9863ffe002_424x424.jpeg'
            }
            daoTitle={'Hyperspace'}
            daoPublished={'April 09, 2022'}
            bountieTag={'Design'}
            bountieTitle={'Hyperspace Logo Design Bounty'}
            bountieReward={'$1000 USDC'}
            sourceUrl={
              'https://superteam.fun/bounties/hyperspace-logo-design-bounty'
            }
          />
        </div>
      </div>
    </>
  );
};

export default BountiesPage;
