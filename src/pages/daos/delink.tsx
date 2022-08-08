import { Avatar } from '@entities/dao';
import Globe from '@shared/icons/Globe.svg';
import Twitter from '@shared/icons/Twitter.svg';
import Discord from '@shared/icons/Discord.svg';
import { ButtonIcon, PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Wallpaper from '@shared/ui/Wallpaper';

const DaoPreview: NextPage = () => {
  const router = useRouter();

  const Separator = () => (
    <span className="mx-2 inline-block h-1 w-1 rounded-full bg-current" />
  );

  const socialLinks = [
    { Icon: Twitter, href: 'https://twitter.com/delinkprotocol' },
    { Icon: Discord, href: 'https://discord.gg/Q5XUpqvE' },
    { Icon: Globe, href: 'https://delink-app.vercel.app/' },
  ];

  const daoDetails = [
    { detailsLabel: 'Created at', detailsData: 'Jul 15, 2022' },
    { detailsLabel: 'Voters', detailsData: '5' },
  ];

  const previewData = [
    {
      displayName: 'DELINK (🕸) Solana Summer Hackathon',
      imgUrl:
        'https://pbs.twimg.com/profile_images/1555477660989591552/MV_ZptiR_400x400.png',
      wallpaperUrl:
        'https://pbs.twimg.com/profile_banners/1515276048237318145/1659689749/1500x500',
      daoDescription:
        'Talent platform for Web3 Professionals 🌐 Professional experience just got real (and owned) 🤯 Permissionless, trustless, built over open-protocol 🕺',
      symbol: 'de1ink',
      shortName: '@delinkprotocol',
    },
  ];

  const daoTags = [{ tag: 'DEX' }, { tag: 'Aggregator' }, { tag: 'Identity' }];

  return (
    <>
      <PageHeader
        goBack={router.back}
        title={'DELINK (🕸) Solana Summer Hackathon'}
      />
      <div className="container grid grid-cols-8 gap-6 px-24">
        {previewData.map(
          (
            {
              displayName,
              imgUrl,
              wallpaperUrl,
              daoDescription,
              symbol,
              shortName,
            },
            idx
          ) => (
            <div
              key={idx}
              className="col-span-full mt-4 h-fit overflow-hidden rounded-xl bg-primary pb-8"
            >
              <Wallpaper imgUrl={wallpaperUrl} />
              <div className="flex">
                <div className="flex w-full flex-col px-6">
                  <div className="-mt-16 mb-6 flex">
                    <div className="self-start">
                      <Avatar imgUrl={imgUrl} placeholder={displayName} />
                    </div>
                    <div className="mb-1 ml-4 flex w-full justify-between self-end">
                      <div className="flex">
                        {daoDetails.map(
                          ({ detailsLabel, detailsData }, idx) => (
                            <div
                              key={idx}
                              className="ml-6 flex w-[112px] flex-col first:ml-0"
                            >
                              <span className="text-sm text-light-300">
                                {detailsLabel}
                              </span>
                              <span className="mt-1 text-subtitle-h2 text-light-500">
                                {detailsData}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                      <div className="flex self-start">
                        {socialLinks.map(({ Icon, href }, idx) => (
                          <>
                            {href && (
                              <div key={idx} className="ml-2 flex first:ml-0">
                                <ButtonIcon
                                  as="a"
                                  href={href}
                                  variant="secondary"
                                >
                                  <Icon />
                                </ButtonIcon>
                              </div>
                            )}
                          </>
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="mb-2 text-xl font-bold">{displayName}</span>
                  <div className="flex items-center text-sm text-light-300">
                    <span>{shortName}</span>
                    <Separator />
                    <span>{symbol}</span>
                  </div>
                  <div className="mt-6 flex">
                    {daoTags.map(({ tag }, idx) => (
                      <div
                        key={idx}
                        className="mr-2 rounded bg-dark-300 px-2 py-1 text-sm text-light-500"
                      >
                        <span>{tag}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text mt-4 text-light-500">
                    {daoDescription}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default DaoPreview;
