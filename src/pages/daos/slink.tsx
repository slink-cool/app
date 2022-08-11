import Globe from '@shared/icons/Globe.svg';
import Twitter from '@shared/icons/Twitter.svg';
import Discord from '@shared/icons/Discord.svg';
import Telegram from '@shared/icons/Telegram.svg';
import {
  Button,
  ButtonIcon,
  PageHeader,
  Wallpaper,
  Avatar,
  Divider,
  DotSeparator,
} from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const DaoPreview: NextPage = () => {
  const router = useRouter();

  const socialLinks = [
    { Icon: Telegram, href: 'https://delink-app.vercel.app/' },
    { Icon: Twitter, href: 'https://twitter.com/delinkprotocol' },
    { Icon: Discord, href: 'https://discord.gg/Q5XUpqvE' },
    { Icon: Globe, href: 'https://delink-app.vercel.app/' },
  ];

  const daoDetails = [
    { detailsLabel: 'Created at', detailsData: 'Jul 15, 2022' },
    { detailsLabel: 'Voters', detailsData: '5' },
    { detailsLabel: 'Token', detailsData: 'S1INK' },
    { detailsLabel: 'Payments', detailsData: '$1m' },
  ];

  const previewData = [
    {
      displayName: 'SLINK (🕸) Solana Summer Hackathon',
      daoDescription:
        'Talent platform for Web3 Professionals 🌐 Professional experience just got real (and owned) 🤯',
      symbol: 's1ink',
      shortName: '@slinkcool',
    },
  ];

  const bounties = [
    {
      bountieTitle: 'Discord Growth Consulting',
      bountieTag: 'Community',
      bountieReward: '$1000 USDT',
    },
    {
      bountieTitle: 'Bug Bounty',
      bountieTag: 'Development',
      bountieReward: '$5000 USDT',
    },
    {
      bountieTitle: 'Logo Design',
      bountieTag: 'Design',
      bountieReward: '$500 USDT',
    },
    {
      bountieTitle: 'Deep Dive',
      bountieTag: 'Analytics',
      bountieReward: '$1500 USDT',
    },
    {
      bountieTitle: 'UX/UI Review',
      bountieTag: 'Design',
      bountieReward: '$1250 USDT',
    },
  ];

  const daoTags = [{ tag: 'DEX' }, { tag: 'Aggregator' }, { tag: 'Identity' }];

  return (
    <>
      <PageHeader
        goBack={router.back}
        title={'SLINK (🕸) Solana Summer Hackathon'}
      />
      <div className="container grid grid-cols-8 gap-8 px-24">
        {previewData.map(
          ({ displayName, daoDescription, symbol, shortName }, idx) => (
            <div
              key={idx}
              className="col-span-full mt-4 h-fit overflow-hidden rounded-xl bg-primary pb-8"
            >
              <Wallpaper imgUrl="/img/wallpaper.png" />
              <div className="flex">
                <div className="flex w-full flex-col px-6">
                  <div className="-mt-16 mb-6 flex">
                    <div className="self-start">
                      <Avatar
                        avatarSize="lg"
                        imgUrl="/img/avatar.png"
                        placeholder={displayName}
                      />
                    </div>
                    <div className="mb-1 ml-4 flex w-full justify-between self-end">
                      <div className="flex">
                        {daoDetails.map(
                          ({ detailsLabel, detailsData }, idx) => (
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
                  <span className="mb-1 text-xl font-bold">{displayName}</span>
                  <div className="flex items-center text-sm text-light-300">
                    <span>{shortName}</span>
                    <DotSeparator />
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
                  <span className="mt-4 text-body text-light-500">
                    {daoDescription}
                  </span>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="container mt-6 grid grid-cols-8 px-24 pb-6">
        <span className="text-title-h2 text-light-500">Bounties</span>
        <div className="col-span-full mt-3 h-fit overflow-hidden rounded-xl bg-primary p-6">
          {bounties.map(({ bountieTitle, bountieTag, bountieReward }, idx) => (
            <>
              <div key={idx} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-subtitle-h2">{bountieTitle}</span>
                  <div className="mt-3 flex items-center">
                    <div className="rounded bg-dark-300 bg-dark-300 px-2 py-1 px-2 py-1 text-sm text-light-500">
                      <span>{bountieTag}</span>
                    </div>
                    <div className="ml-2 rounded bg-accent-500 bg-accent-500 px-2 py-1 px-2 py-1 text-sm text-dark-500">
                      <span>{bountieReward}</span>
                    </div>
                  </div>
                </div>
                <Button variant="secondary" title="Read more" />
              </div>
              <Divider />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DaoPreview;
