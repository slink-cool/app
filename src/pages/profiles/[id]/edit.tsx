import { fetchUser, SWR_USER_KEY, updateUser, User } from '@entities/user';
import SkillsForm from '@features/profile-edit/ui/SkillsForm';
import { Tab } from '@headlessui/react';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import { strToBytes } from '@shared/encode-utils';
import ArrowLeft from '@shared/icons/ArrowLeft.svg';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

const ProfileEditPage: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const profileId: string = (id as string) || DEFAULT_PUBLIC_KEY_STR;
  const profilePK = new PublicKey(profileId);

  const { data: userInfo = null, isLoading: isLoadingUserInfo } = useSWR(
    [SWR_USER_KEY, profileId],
    ([_, profileId]) => fetchUser(profileId)
  );

  const { trigger: saveUserInfo } = useSWRMutation(
    [SWR_USER_KEY, profileId],
    ([_, profileId], { arg }: { arg: Omit<User, 'id'> }) =>
      updateUser(profileId, arg)
  );

  const wallet = useWallet();

  const walletPublicKey = wallet.publicKey || PublicKey.default;
  const isOwner = walletPublicKey.equals(profilePK);

  return (
    <>
      <Head>
        <title>Slink — Profile — Edit</title>
      </Head>
      <div className="container grid grid-cols-8 gap-6 px-24">
        <div className="col-span-8 pt-8">
          <div
            className="mb-6 flex cursor-pointer flex-row items-center text-sm text-light-300"
            onClick={router.back}
          >
            <ArrowLeft />
            Back to profile
          </div>
          <Tab.Group>
            <Tab.List className="mb-6 flex w-full flex-row space-x-6">
              <Tab
                className={({ selected }) =>
                  `flex flex-1 border-b-2 ${
                    selected
                      ? 'border-accent'
                      : 'border-dark-400 text-light-400'
                  } font-bold outline-none`
                }
              >
                Skills
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <SkillsForm
                  userId={profileId}
                  onCancel={() => {
                    router.back();
                  }}
                  onSave={async (skills) => {
                    const skillTitles = skills.map((skill) => skill.title);
                    const msg =
                      'I confirm that I own the following skills: \n' +
                      skillTitles.join('\n');
                    await wallet.signMessage?.(strToBytes(msg));
                    router.back();
                  }}
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
};

export default ProfileEditPage;
