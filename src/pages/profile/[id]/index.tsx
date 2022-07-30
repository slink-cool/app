import { Avatar } from '@entities/profile';
import {
  fetchSnsFavoriteDomain,
  SWR_PROFILE_FAV_DOMAIN_KEY,
} from '@entities/profile/api';
import { fetchUserInfo, SWR_USER_KEY, UserInfo } from '@entities/user';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import EditIcon from '@shared/icons/Edit.svg';
import { displayPublicKey } from '@shared/ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { GetServerSideProps, NextPage } from 'next';
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
    ([_, profileId]) => fetchUserInfo(profileId)
  );

  const { data: favDomain } = useSWR([SWR_PROFILE_FAV_DOMAIN_KEY, userId], () =>
    fetchSnsFavoriteDomain(connection, userPK)
  );

  const favDomainHumanReadable = favDomain ? `${favDomain.reverse}.sol` : null;

  const humanReadableDisplayName =
    userInfo?.displayName || favDomainHumanReadable || null;

  return (
    <>
      <div className="col-span-full mt-8 h-fit overflow-hidden rounded-xl bg-primary pb-8">
        <div className="h-44 bg-[#D3EDFF]">
          {isOwner && (
            <div className="flex w-full justify-end p-4">
              <Link
                href={{
                  pathname: '/profile/[id]/edit',
                  query,
                }}
              >
                <button className="rounded-full bg-light-500 p-2 text-accent shadow-md">
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
    </>
  );
};

export default ProfilePage;
