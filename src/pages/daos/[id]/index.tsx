import { fetchDao, SWR_DAO_KEY } from '@entities/dao';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import Globe from '@shared/icons/Globe.svg';
import Twitter from '@shared/icons/Twitter.svg';
import { ButtonIcon, PageHeader, Avatar, Wallpaper } from '@shared/ui';
import dayjs from 'dayjs';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const DaosPage: NextPage = () => {
  const { query } = useRouter();
  const router = useRouter();

  const daoId = (query.id as string) || DEFAULT_PUBLIC_KEY_STR;

  const { data: daoInfo, isLoading: isLoadingDaoInfo } = useSWR(
    [SWR_DAO_KEY, daoId],
    ([_, daoId]) => fetchDao(daoId)
  );

  const humanCreationDate = () => {
    if (!daoInfo || !daoInfo.firstVoting) {
      return null;
    }
    return dayjs.utc(daoInfo.firstVoting).format('MMM DD, YYYY');
  };

  const socialLinks = [
    { Icon: Twitter, href: daoInfo?.twitter },
    { Icon: Globe, href: daoInfo?.website },
  ];

  const daoDetails = [
    { detailsLabel: 'Created at', detailsData: humanCreationDate() },
    { detailsLabel: 'Voters', detailsData: daoInfo?.votersCount },
    { detailsLabel: 'Token', detailsData: daoInfo?.symbol },
  ];

  return (
    <>
      <Head>
        <title>Slink — DAO — {daoInfo?.displayName || daoInfo?.symbol}</title>
      </Head>
      <PageHeader goBack={router.back} title={daoInfo?.displayName || ''} />
      <div className="container grid grid-cols-8 gap-6 px-24">
        <div className="col-span-full mt-4 h-fit overflow-hidden rounded-xl bg-primary pb-8">
          <Wallpaper />
          <div className="flex">
            <div className="flex w-full flex-col px-6">
              <div className="-mt-16 mb-6 flex">
                <div className="self-start">
                  <Avatar
                    avatarSize="lg"
                    imgUrl={daoInfo?.logoUrl}
                    placeholder={daoInfo?.displayName || daoId}
                  />
                </div>
                <div className="mb-1 ml-4 flex w-full justify-between self-end">
                  <div className="flex">
                    {daoDetails.map(({ detailsLabel, detailsData }, idx) => {
                      if (detailsData === null || detailsData === undefined) {
                        return null;
                      }
                      return (
                        <div
                          key={idx}
                          className="ml-8 flex w-auto flex-col first:ml-0"
                        >
                          <span className="text-sm text-light-300">
                            {detailsLabel}
                          </span>
                          <span className="mt-1 text-subtitle-h2 text-light-500">
                            {detailsData}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex self-start">
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
              </div>
              <span className="mb-1 text-xl font-bold">
                {daoInfo?.displayName}
              </span>
              <span className="text-sm text-light-300">{daoInfo?.symbol}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DaosPage;
