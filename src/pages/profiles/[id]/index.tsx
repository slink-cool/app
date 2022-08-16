import { BountieCard } from '@entities/bounties';
import {
  fetchSnsFavoriteDomain,
  fetchUserSkills,
  SWR_PROFILE_SKILLS_KEY,
  SWR_PROFILE_SNS_FAV_DOMAIN_KEY,
} from '@entities/profile';
import { fetchUser, SWR_USER_KEY } from '@entities/user';
import { DEFAULT_PUBLIC_KEY_STR, EMPTY_ARR } from '@shared/defaults';
import Discord from '@shared/icons/Discord.svg';
import Globe from '@shared/icons/Globe.svg';
import Telegram from '@shared/icons/Telegram.svg';
import Twitter from '@shared/icons/Twitter.svg';
import {
  Avatar,
  Button,
  ButtonIcon,
  displayPublicKey,
  DotSeparator,
  PageHeader,
  Wallpaper,
} from '@shared/ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import ConnectIllustration from '/public/illustrations/connect.svg';

const ProfilePage: NextPage = () => {
  const { query } = useRouter();
  const { connection } = useConnection();
  const router = useRouter();

  const userId = (query.id as string) || DEFAULT_PUBLIC_KEY_STR;
  const userPK = new PublicKey(userId);

  const wallet = useWallet();
  const walletPublicKey = wallet.publicKey || PublicKey.default;

  const isOwner = walletPublicKey.equals(userPK);

  const { data: userInfo, isLoading: isLoadingUserInfo } = useSWR(
    [SWR_USER_KEY, userId],
    ([_, profileId]) => fetchUser(profileId)
  );

  const { data: favDomain } = useSWR(
    [SWR_PROFILE_SNS_FAV_DOMAIN_KEY, userId],
    () => fetchSnsFavoriteDomain(connection, userPK)
  );

  const socialLinks = [
    { Icon: Telegram, href: '' },
    { Icon: Twitter, href: '' },
    { Icon: Discord, href: '' },
    { Icon: Globe, href: '' },
  ];

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

  const userTags = [{ tag: '' }, { tag: '' }];

  const { data: userSkills = EMPTY_ARR } = useSWR(
    [SWR_PROFILE_SKILLS_KEY, userId],
    ([_, userId]) => fetchUserSkills(userId)
  );

  const favDomainHumanReadable = favDomain ? `${favDomain.reverse}.sol` : null;

  const humanReadableDisplayName =
    userInfo?.displayName || favDomainHumanReadable || null;

  return (
    <>
      <Head>
        <title>Slink — Profile</title>
      </Head>
      <PageHeader
        title={humanReadableDisplayName || userId}
        goBack={router.back}
      />
      <div className="container grid grid-cols-8 gap-8 px-24 pb-6">
        <div className="col-span-full mt-2 h-fit overflow-hidden rounded-xl bg-primary pb-8">
          <div className="h-44">
            <Wallpaper isOwner={isOwner} />
          </div>
          <div className="flex flex-col px-6">
            <div className="-mt-16 mb-6 flex">
              <div className="self-start">
                <Avatar
                  avatarSize="lg"
                  placeholder={humanReadableDisplayName || userId}
                />
              </div>
              <div className="mb-1 ml-4 flex w-full justify-end self-end">
                <div className="flex self-start">
                  {socialLinks.map(({ Icon, href }, idx) => (
                    <>
                      {href && (
                        <div key={idx} className="ml-2 flex first:ml-0">
                          <ButtonIcon as="a" href={href} variant="secondary">
                            <Icon />
                          </ButtonIcon>
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
            <span className="mb-1 text-xl font-bold">
              {humanReadableDisplayName
                ? humanReadableDisplayName
                : displayPublicKey(userId)}
            </span>
            <div className="flex text-light-300">
              {humanReadableDisplayName && (
                <div className="text-sm">
                  <span>{displayPublicKey(userId)}</span>
                </div>
              )}
              {favDomain &&
                humanReadableDisplayName !== favDomainHumanReadable && (
                  <div>
                    <DotSeparator />
                    <span className="text-sm">{favDomain.reverse}.sol</span>
                  </div>
                )}
            </div>
            <div className="flex">
              {userTags.map(({ tag }, idx) => (
                <>
                  {tag && (
                    <div
                      key={idx}
                      className="mt-6 mr-2 rounded bg-dark-300 px-2 py-1 text-sm text-light-500"
                    >
                      <span>{tag}</span>
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
        {!userSkills.length && (
          <div className="col-span-full flex h-fit items-center justify-between overflow-hidden rounded-xl bg-primary pl-6">
            <div className="flex w-[40%] flex-col">
              <span className="text-title-h2 text-light-500">
                Looks like you are a newbie
              </span>
              <span className="mt-4 text-body text-light-400">
                Fill out your profile so DAOs communities can learn more about
                you and your experience in web3 community
              </span>
              <div className="mt-8 flex">
                <div className="cursor-pointer">
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
        )}

        {/* bounties if profile is empty */}
        <span className="col-span-full -mb-6 text-title-h2 text-light-500">
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
        {Boolean(userSkills.length) && (
          <span className="col-span-full -mb-6 text-title-h2">Skills</span>
        )}
        {userSkills.map((skill) => {
          return (
            <div
              key={skill.id}
              className="col-span-4 flex flex-col overflow-hidden rounded-xl bg-primary p-6"
            >
              <span className="mb-3 text-subtitle-h2">{skill.title}</span>
              <div className="w-fit rounded bg-[#58735452] px-2 py-1 text-caption text-[#6BCC5B]">
                Confirmed by N users
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfilePage;
