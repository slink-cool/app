import { PageHeader } from '@shared/ui';
import { PublicKey } from '@solana/web3.js';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ProfilesPage: NextPage = () => {
  const router = useRouter();

  const isLoading = true;

  return (
    <>
      <div className="container sticky top-0 mb-4 border-b border-dark-300 bg-dark-500 px-24  py-4">
        <PageHeader
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
      </div>
      <div className="container grid grid-cols-8 gap-6 px-24">
        {isLoading &&
          [...Array(6)].map((it) => (
            <div key={it} className="col-span-8 overflow-hidden rounded-xl">
              <div className="h-[120px] bg-primary" />
            </div>
          ))}
        {/* insert data */}
      </div>
    </>
  );
};

export default ProfilesPage;
