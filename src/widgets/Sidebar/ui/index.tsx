import { WalletButton } from '@entities/wallet';
import BriefcaseOutline from '@shared/icons/BriefcaseOutline.svg';
import UserGroupOutline from '@shared/icons/UserGroupOutline.svg';
import ViewGridOutline from '@shared/icons/ViewGridOutline.svg';
import ExternalLinkOutline from '@shared/icons/ExternalLinkOutline.svg';
import Logo from '@shared/icons/Logo.svg';
import NewspaperOutline from '@shared/icons/NewspaperOutline.svg';
import PlusCircleOutline from '@shared/icons/PlusCircleOutline.svg';
import Link from 'next/link';

const discover = [
  { Icon: ViewGridOutline, title: 'DAOs' },
  {
    Icon: BriefcaseOutline,
    title: 'Bounties',
  },
  {
    Icon: UserGroupOutline,
    title: 'Profiles',
  },
  {
    Icon: ExternalLinkOutline,
    title: 'Wiki',
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
  return (
    <div className="h-screen w-80 bg-primary">
      <div className="flex flex-col py-8 px-6">
        <Link href="/">
          <button className="mb-8 flex flex-row items-center">
            <Logo className="mr-2" />
            <span className="text-2xl font-bold">delink</span>
          </button>
        </Link>
        <div className="mb-12">
          <WalletButton />
        </div>
        <div className="flex flex-col">
          <span className="mb-4 text-sm font-bold uppercase text-secondary">
            Discover
          </span>
          <div className="flex flex-col px-5 text-primary">
            {discover.map(({ title, Icon }) => (
              <div key={title} className="mb-6 flex flex-row">
                <Icon className="mr-3" />
                <span className="font-bold">{title}</span>
              </div>
            ))}
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
    </div>
  );
};

export default Sidebar;
