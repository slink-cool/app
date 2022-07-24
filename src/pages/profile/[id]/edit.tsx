import { Avatar } from '@entities/profile';
import {
  fetchUserInfo,
  SWR_USER_KEY,
  updateUserInfo,
  UserInfo,
} from '@entities/user';
import { Tab } from '@headlessui/react';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import { Button, TextInput } from '@shared/ui';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const ProfileEditPage: NextPage<{ userInfo: UserInfo }> = ({ userInfo }) => {
  const router = useRouter();

  const { id } = router.query;
  const profileId: string = (id as string) || DEFAULT_PUBLIC_KEY_STR;
  const profilePK = new PublicKey(profileId);

  const { data } = useSWR(
    [SWR_USER_KEY, profileId],
    ([_, profileId]) => fetchUserInfo(profileId),
    { fallbackData: userInfo }
  );

  const { trigger } = useSWRMutation(
    [SWR_USER_KEY, profileId],
    ([_, profileId], { arg }) => updateUserInfo(profileId, arg)
  );

  const [displayName, setDisplayName] = useState<string>(
    data?.displayName || ''
  );

  const [shortName, setShortName] = useState<string>(data?.shortName || '');

  const onSave = () => {
    trigger({ displayName });
    router.back();
  };

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
        <Tab.List className="mb-6 flex w-full flex-row space-x-6">
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
            <div className="col-span-8 flex flex-col overflow-hidden rounded-xl bg-primary">
              <div className=" h-44 bg-[#D3EDFF]" />
              <div className="border-b border-b-dark-300 px-6">
                <div className="-mt-16 mb-6">
                  <Avatar pk={profilePK} />
                </div>
                <div className="mb-6">
                  <TextInput
                    title="Display name"
                    placeholder="Enter display name"
                    value={displayName}
                    onTextChange={setDisplayName}
                  />
                </div>
                <div className="mb-6">
                  <TextInput
                    title="Short name"
                    placeholder="e.g. @delink"
                    value={shortName}
                    onTextChange={setShortName}
                  />
                </div>
              </div>
              <div className="flex flex-1 justify-between p-6">
                <Button title="Cancel" kind="secondary" />
                <Button title="Save" onClick={onSave} />
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel></Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query.id;
  const userInfo = await fetchUserInfo(id as string);
  return {
    props: {
      userInfo,
    },
  };
};

export default ProfileEditPage;
