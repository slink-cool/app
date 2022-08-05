import { Avatar } from '@entities/profile';
import { listUsers, SWR_USERS_LIST_KEY } from '@entities/user';
import { EMPTY_ARR } from '@shared/defaults';
import { PageHeader } from '@shared/ui';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ProfilesPage: NextPage = () => {
  const router = useRouter();

  const { data = EMPTY_ARR, isLoading } = useSWR([SWR_USERS_LIST_KEY], () =>
    listUsers()
  );

  return (
    <>
      <PageHeader
        hasSearch
        title="Profile"
        goBack={router.back}
        onGoToClick={(value) =>
          router.push({ pathname: 'profiles/[id]', query: { id: value } })
        }
        goToValidator={(value) => {
          try {
            const key = new PublicKey(value);
            return Boolean(key);
          } catch {
            return false;
          }
        }}
      />
      <div className="container grid grid-cols-8 gap-6 px-24">
        {isLoading &&
          [...Array(6)].map((it) => (
            <div
              key={it}
              className="col-span-8 animate-pulse overflow-hidden rounded-xl"
            >
              <div className="h-[120px] bg-primary" />
            </div>
          ))}
        {data.map((user) => (
          <Link
            key={user.id}
            href={{ pathname: '/profiles/[id]', query: { id: user.id } }}
          >
            <div className="col-span-8 flex cursor-pointer overflow-hidden rounded-xl bg-primary p-6 hover:ring-2 hover:ring-dark-300">
              <div className="mr-4">
                <Avatar placeholder={user.id} />
              </div>
              <div className="flex">
                <span className="text-subtitle-h1 text-light-500">
                  {user.displayName || user.id}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProfilesPage;
