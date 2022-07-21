import { WalletButton } from '@entities/wallet';
import BriefcaseOutline from '@shared/icons/BriefcaseOutline.svg';
import UserGroupOutline from '@shared/icons/UserGroupOutline.svg';
import ViewGridOutline from '@shared/icons/ViewGridOutline.svg';
import ExternalLinkOutline from '@shared/icons/ExternalLinkOutline.svg';

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

const Sidebar = () => {
  return (
    <div className="w-80 bg-primary h-screen">
      <div className="flex flex-col py-8 px-6">
        <div className="mb-12">
          <WalletButton />
        </div>
        <div className="flex flex-col">
          <span className="text-secondary mb-4">Discover</span>
          <div className="flex flex-col px-5 text-primary">
            {discover.map(({ title, Icon }) => (
              <div key={title} className="flex flex-row">
                <Icon className="mr-3" />
                <span>{title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
