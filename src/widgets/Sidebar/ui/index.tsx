import { WalletButton } from '@entities/wallet';
import BriefcaseOutline from '@shared/icons/BriefcaseOutline.svg';
import UserGroupOutline from '@shared/icons/UserGroupOutline.svg';
import ViewGridOutline from '@shared/icons/ViewGridOutline.svg';
import ExternalLinkOutline from '@shared/icons/ExternalLinkOutline.svg';
import Board from '@shared/icons/Board.svg';
import Logo from '@shared/icons/Logo.svg';
import NewspaperOutline from '@shared/icons/NewspaperOutline.svg';
import PlusCircleOutline from '@shared/icons/PlusCircleOutline.svg';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const discover = [
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
  {
    Icon: ExternalLinkOutline,
    title: 'Wiki',
    href: '/wiki',
  },
];

const forYou = [
  {
    Icon: NewspaperOutline,
    title: 'My Bounties',
  },
  {
    Icon: PlusCircleOutline,
    title: 'Add your DAO',
  },
];

const Sidebar = () => {
  const { pathname } = useRouter();

  return (
    <div className="flex flex-col py-8 px-6">
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
  );
};

export default Sidebar;
