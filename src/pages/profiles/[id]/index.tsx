import {
  fetchSnsFavoriteDomain,
  SWR_PROFILE_SNS_FAV_DOMAIN_KEY,
} from '@entities/profile';
import { fetchUser, SWR_USER_KEY } from '@entities/user';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import { displayPublicKey, Avatar, Wallpaper, Button } from '@shared/ui';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ConnectIllustration from '/public/illustrations/connect.svg';
import { BountieCard } from '@entities/bounties';
import Link from 'next/link';

const ProfilePage: NextPage = () => {
  const { query } = useRouter();
  const { connection } = useConnection();

  const userId = (query.id as string) || DEFAULT_PUBLIC_KEY_STR;
  const userPK = new PublicKey(userId);

  const { data: userInfo, isLoading: isLoadingUserInfo } = useSWR(
    [SWR_USER_KEY, userId],
    ([_, profileId]) => fetchUser(profileId)
  );

  const { data: favDomain } = useSWR(
    [SWR_PROFILE_SNS_FAV_DOMAIN_KEY, userId],
    () => fetchSnsFavoriteDomain(connection, userPK)
  );

  const bounties = [
    {
      avatarUrl:
        'https://stakingcrypto.info/static/assets/coins/solana-logo.png?v=34',

      daoTitle: 'Solana',
      daoPublished: 'May 31, 2022',
      bountieTag: 'Development',
      bountieTitle:
        'Build a Solana + Filecoin/IPFS Project for the Bangalore Hacker House',

      bountieReward: '$3000 USDC',
      sourceUrl:
        'https://superteam.fun/bounties/build-a-solana-filecoinipfs-project-for-the-bangalore-hacker-house',
    },
    {
      avatarUrl:
        'https://pbs.twimg.com/profile_images/1493136166975160328/S_HMX8bX_400x400.jpg',

      daoTitle: 'Crowdpad',
      daoPublished: 'May 28, 2022',
      bountieTag: 'Research',
      bountieTitle: 'Crowdpad Deep Dive',

      bountieReward: '$1000 USDC',
      sourceUrl: 'https://superteam.fun/bounties/crowdpad-deep-dive',
    },
    {
      avatarUrl:
        'https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/5bf07e40-81d8-42ec-a060-5a9863ffe002_424x424.jpeg',

      daoTitle: 'HyperSpace',
      daoPublished: 'April 09, 2022',
      bountieTag: 'Design',
      bountieTitle: 'Hyperspace Logo Design Bounty',

      bountieReward: '$1000 USDC',
      sourceUrl: 'https://superteam.fun/bounties/hyperspace-logo-design-bounty',
    },
    {
      avatarUrl:
        'https://blog.coindcx.com/wp-content/uploads/2021/09/ProfilePic.svg',

      daoTitle: 'CoinCDX',
      daoPublished: 'May 1, 2022',
      bountieTag: 'Research',
      bountieTitle: 'Evaluating Web3 Projects Deep Dive',

      bountieReward: '$700 USDC',
      sourceUrl: 'https://superteam.fun/bounties/coindcx-deep-dive-bounty',
    },
  ];

  const favDomainHumanReadable = favDomain ? `${favDomain.reverse}.sol` : null;

  const humanReadableDisplayName =
    userInfo?.displayName || favDomainHumanReadable || null;

  return (
    <div className="container grid grid-cols-8 gap-6 px-24">
      <div className="col-span-full mt-8 h-fit overflow-hidden rounded-xl bg-primary pb-8">
        <div className="h-44">
          <Wallpaper />
        </div>
        <div className="flex flex-col px-6">
          <div className="-mt-16 mb-6">
            <Avatar
              avatarSize="lg"
              placeholder={humanReadableDisplayName || userId}
            />
          </div>
          <span className="mb-1 text-xl font-bold">
            {humanReadableDisplayName
              ? humanReadableDisplayName
              : displayPublicKey(userId)}
          </span>
          {humanReadableDisplayName && (
            <span className="text-sm text-light-300">
              {displayPublicKey(userId)}
            </span>
          )}
          {favDomain && humanReadableDisplayName !== favDomainHumanReadable && (
            <span className="text-sm text-light-300">
              {favDomain.reverse}.sol
            </span>
          )}
        </div>
      </div>
      <div className="col-span-full flex h-fit items-center justify-between overflow-hidden rounded-xl bg-primary pl-6">
        <div className="flex w-[40%] flex-col">
          <span className="text-title-h2 text-light-500">
            Looks like you are newbie
          </span>
          <span className="mt-4 text-body text-light-400">
            Fill out your profile so DAOs communities can learn more about you
            and your experience in web3 community
          </span>
          <div className="mt-8 flex">
            <div>
              <Link
                href={{
                  pathname: '/profiles/[id]/edit',
                  query,
                }}
              >
                <Button as="a" title="Fill out profile" />
              </Link>
            </div>
            <div className="ml-3">
              <Button
                as="a"
                href="/jobs"
                variant="secondary"
                title="See DAOs who hire"
              />
            </div>
          </div>
        </div>
        <div className="flex h-full items-start justify-start">
          <ConnectIllustration />
        </div>
      </div>

      {/* bounties if not auth */}
      <span className="col-span-full -mb-4 text-title-h2 text-light-500">
        Bounties, that can be yours
      </span>
      {bounties.map(
        (
          {
            daoTitle,
            avatarUrl,
            daoPublished,
            bountieTag,
            bountieTitle,
            bountieReward,
            sourceUrl,
          },
          idx
        ) => (
          <div key={idx} className="col-span-2">
            <BountieCard
              daoTitle={daoTitle}
              bountieTitle={bountieTitle}
              bountieReward={bountieReward}
              sourceUrl={sourceUrl}
              avatarUrl={avatarUrl}
              daoPublished={daoPublished}
              bountieTag={bountieTag}
            />
          </div>
        )
      )}

      {/* skills */}
      <span className="col-span-full -mb-4 text-title-h2">Skills</span>
      {['Product Design', 'C++', 'JS'].map((skill) => {
        return (
          <div
            key={skill}
            className="col-span-4 flex flex-col overflow-hidden rounded-xl bg-primary p-6"
          >
            <span className="mb-3 text-subtitle-h2">{skill}</span>
            <div className="w-fit rounded bg-[#58735452] px-2 py-1 text-caption text-[#6BCC5B]">
              Confirmed by N users
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfilePage;
