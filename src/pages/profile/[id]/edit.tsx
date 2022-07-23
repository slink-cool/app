import { Avatar } from '@entities/profile';
import { Tab } from '@headlessui/react';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ProfileEditPage: NextPage = () => {
  const router = useRouter();

  const { id: profileId = DEFAULT_PUBLIC_KEY_STR } = router.query;
  const profilePK = new PublicKey(profileId);

  const wallet = useWallet();

  const walletPublicKey = wallet.publicKey || PublicKey.default;
  const isOwner = walletPublicKey.equals(profilePK);

  return (
    <div className="pt-8">
      <div className="mb-6 cursor-pointer">
        <a onClick={router.back} className="text-sm text-light-300">
          Back to profile
        </a>
      </div>
      <Tab.Group>
        <Tab.List className="flex w-full flex-row space-x-6">
          <Tab
            className={({ selected }) =>
              `flex flex-1 border-b-2 ${
                selected ? 'border-accent' : 'border-dark-400 text-light-400'
              } font-bold outline-none`
            }
          >
            Intro
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex flex-1 border-b-2 ${
                selected ? 'border-accent' : 'border-dark-400 text-light-400'
              } font-bold outline-none`
            }
          >
            Skills
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div className="col-span-8 mt-8 mb-10 h-[348px] overflow-hidden rounded-xl bg-primary">
              <div className="h-1/2 bg-[#D3EDFF]" />
              <div className="px-6">
                <div className="-mt-16 mb-2">
                  <Avatar pk={profilePK} />
                </div>
                <span>{profileId}</span>
              </div>
            </div>
            <div className="h-[200px] grid-cols-8 overflow-hidden rounded-xl bg-primary"></div>
          </Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default ProfileEditPage;
