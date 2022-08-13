import { Avatar } from '@entities/profile';
import { listUsers, SWR_USERS_LIST_KEY } from '@entities/user';
import { EMPTY_ARR } from '@shared/defaults';
import { ButtonIcon, PageHeader } from '@shared/ui';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Telegram from '@shared/icons/Telegram.svg';
import Twitter from '@shared/icons/Twitter.svg';
import Discord from '@shared/icons/Discord.svg';
import Globe from '@shared/icons/Globe.svg';

const ProfilesPage: NextPage = () => {
  const router = useRouter();

  const { data = EMPTY_ARR, isLoading } = useSWR([SWR_USERS_LIST_KEY], () =>
    listUsers()
  );

  const socialLinks = [
    { Icon: Telegram, href: '/' },
    { Icon: Twitter, href: '/' },
    { Icon: Discord, href: '/' },
    { Icon: Globe, href: '/' },
  ];

  const userTags = [
    { tag: 'Founder' },
    { tag: 'Product Manager' },
    { tag: 'Growth Manager' },
  ];

  return (
    <>
      <PageHeader
        hasSearch
        title="Profiles"
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
        <Link href={{ pathname: '/profiles/demo' }}>
          <div className="col-span-8 flex cursor-pointer items-center justify-between overflow-hidden rounded-xl bg-primary p-6 hover:ring-2 hover:ring-dark-300">
            <div className="flex">
              <div className="mr-4">
                <Avatar
                  avatarSize="md"
                  placeholder="vlad"
                  imgUrl="/img/userAvatar.png"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-subtitle-h1 text-light-500">
                  vladkooklev.sol
                </span>
                <span className="mt-1 text-label text-light-300">
                  vladkooklev.sol
                </span>
                <div className="mt-3 flex">
                  {userTags.map(({ tag }, idx) => (
                    <div
                      key={idx}
                      className="mr-2 rounded bg-dark-300 px-2 py-1 text-sm text-light-500"
                    >
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex">
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
        </Link>
        {data.map((user) => (
          <Link
            key={user.id}
            href={{ pathname: '/profiles/[id]', query: { id: user.id } }}
          >
            <div className="col-span-8 flex cursor-pointer items-center overflow-hidden rounded-xl bg-primary p-6 hover:ring-2 hover:ring-dark-300">
              <div className="mr-4">
                <Avatar
                  avatarSize="md"
                  placeholder={user.displayName || user.id}
                />
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
