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

const discover = [
  { Icon: User, title: 'My Profile', href: '/' },
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
];

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

const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <div className="flex h-full flex-col py-8 px-6">
      <Link href="/">
        <button className="mb-8 flex flex-row items-center">
          <div className="transition hover:text-accent-500">
            <Logo className="mr-2" />
          </div>
          <span className="text-2xl font-medium">slink</span>
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
                const active = pathname.includes(href);
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
