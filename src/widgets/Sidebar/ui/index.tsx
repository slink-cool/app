import { WalletButton } from '@entities/wallet';
import BriefcaseOutline from '@shared/icons/BriefcaseOutline.svg';
import UserGroupOutline from '@shared/icons/UserGroupOutline.svg';
import ViewGridOutline from '@shared/icons/ViewGridOutline.svg';
import User from '@shared/icons/User.svg';
import Board from '@shared/icons/Board.svg';
import Logo from '@shared/icons/Logo.svg';
import Discord from '@shared/icons/Discord.svg';
import Twitter from '@shared/icons/Twitter.svg';
import PlusCircleOutline from '@shared/icons/PlusCircleOutline.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { ButtonIcon } from '@shared/ui';
import { useMemo } from 'react';
import { supabase } from '@shared/supabase';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { EMPTY_ARR } from '@shared/defaults';

const forYou = [
  {
    Icon: PlusCircleOutline,
    title: 'Add your DAO',
  },
];

const social = [
  { Icon: Twitter, href: 'https://twitter.com/slinkcool' },
  { Icon: Discord, href: 'https://discord.gg/Q5XUpqvE' },
];

interface SidebarProps {
  userId?: PublicKey | null;
}

const Sidebar: React.FC<SidebarProps> = ({ userId }) => {
  const { asPath } = useRouter();

  const userIdStr = userId?.toString();

  const discover = useMemo(
    () => [
      ...(userIdStr
        ? [{ Icon: User, title: 'My Profile', href: `/profiles/${userIdStr}` }]
        : EMPTY_ARR),
      { Icon: ViewGridOutline, title: 'DAOs', href: '/daos' },
      {
        Icon: BriefcaseOutline,
        title: 'Bounties',
        href: '/bounties',
      },
      {
        Icon: Board,
        title: 'Jobs',
        href: '/jobs',
      },
      {
        Icon: UserGroupOutline,
        title: 'Profiles',
        href: '/profiles',
      },
    ],
    [userIdStr]
  );

  return (
    <div className="flex h-full flex-col py-8 px-6">
      <Link href="/">
        <button className="mb-8 flex flex-row items-center hover:text-accent-500">
          <div className="transition">
            <Logo className="mr-2" />
          </div>
          <span className="text-2xl font-medium text-white">slink</span>
        </button>
      </Link>
      <div className="mb-12">
        <WalletButton />
      </div>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="mb-4 text-sm font-bold uppercase text-secondary">
              Discover
            </span>
            <div className="flex flex-col px-5 text-light-400 ">
              {discover.map(({ title, Icon, href }, idx) => {
                const active = asPath === href;
                return (
                  <Link key={idx} href={href}>
                    <a
                      className={clsx(
                        'mb-6 flex cursor-pointer flex-row transition hover:text-light-300',
                        active && 'text-white'
                      )}
                    >
                      <Icon className="mr-3" />
                      <span className="font-bold">{title}</span>
                    </a>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="mb-4 text-sm font-bold uppercase text-secondary">
              for you
            </span>
            <div className="flex flex-col px-5 text-primary">
              {forYou.map(({ title, Icon }) => (
                <div key={title} className="mb-6 flex flex-row">
                  <Icon className="mr-3" />
                  <span className="font-bold">{title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex">
          {social.map(({ Icon, href }, idx) => (
            <div className="ml-2 first:ml-0" key={idx}>
              <a href={href} target="_blank" rel="noreferrer">
                <ButtonIcon variant="secondary">
                  <Icon />
                </ButtonIcon>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
