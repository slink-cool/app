import {
  fetchSnsFavoriteDomain,
  SWR_PROFILE_SNS_FAV_DOMAIN_KEY,
} from '@entities/profile';
import { fetchUser, SWR_USER_KEY } from '@entities/user';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import EditIcon from '@shared/icons/Edit.svg';
import { displayPublicKey, Avatar } from '@shared/ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ProfilePage: NextPage = () => {
  const { query } = useRouter();
  const { connection } = useConnection();

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

  const favDomainHumanReadable = favDomain ? `${favDomain.reverse}.sol` : null;

  const humanReadableDisplayName =
    userInfo?.displayName || favDomainHumanReadable || null;

  return (
    <div className="container grid grid-cols-8 gap-6 px-24">
      <div className="col-span-full mt-8 h-fit overflow-hidden rounded-xl bg-primary pb-8">
        <div className="h-44 bg-[#D3EDFF]">
          {isOwner && (
            <div className="flex w-full justify-end p-4">
              <Link
                href={{
                  pathname: '/profiles/[id]/edit',
                  query,
                }}
              >
                <button className="text-accent rounded-full bg-light-500 p-2 text-accent-500 shadow-md">
                  <EditIcon />
                </button>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col px-6">
          <div className="-mt-16 mb-2">
            <Avatar placeholder={humanReadableDisplayName || userId} />
          </div>
          <span className="mb-2 text-xl font-bold">
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
