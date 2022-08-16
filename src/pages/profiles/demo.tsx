import DaoCard from '@entities/profile/ui/DaoCard';
import HighlightCard from '@entities/profile/ui/HighlightCard';
import { DEFAULT_PUBLIC_KEY_STR } from '@shared/defaults';
import Discord from '@shared/icons/Discord.svg';
import Globe from '@shared/icons/Globe.svg';
import Telegram from '@shared/icons/Telegram.svg';
import Twitter from '@shared/icons/Twitter.svg';
import Award from '@shared/icons/Award.svg';
import {
  Avatar,
  ButtonIcon,
  displayPublicKey,
  DotSeparator,
  PageHeader,
  Wallpaper,
} from '@shared/ui';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const ProfilePage: NextPage = () => {
  const router = useRouter();

  const userId = DEFAULT_PUBLIC_KEY_STR;

  const daos = [
    {
      title: 'Slink — Web3 Identity Platform',
      description: 'Web3 platform for IT-specialists',
      worksDate: 'Jul 22, 2022 — Present',
      avatarUrl: '/img/avatar.png',
      worksDuration: '1 month',
    },
    {
      title: '1Sol',
      description: 'Protocol',
      worksDate: 'Jul 22, 2022 — Present',
      avatarUrl:
        'https://icodrops.com/wp-content/uploads/2021/11/1SolProtocol_logo.jpeg',
      worksDuration: '1 month',
    },
  ];

  const socialLinks = [
    { Icon: Telegram, href: 'https://t.me/vladkooklev' },
    { Icon: Twitter, href: 'https://twitter.com/vladkooklev' },
    { Icon: Discord, href: 'https://discord.gg/emv7K6mEaC' },
    { Icon: Globe, href: 'https://app.slink.cool/profiles/demo' },
  ];

  const highlights = [
    {
      daoTitle: 'Slink — Web3 Identity Platform',
      daoPublished: 'Jun 3, 2022',
      title: 'Reward: Tweet Storms and Blog Posts',
      avatarUrl: '/img/avatar.png',
      address: '0x41477A57A8916237A8ff512bA3D9bF487D9cbb79',
    },
    {
      daoTitle: 'Slink — Web3 Identity Platform',
      daoPublished: 'Jun 3, 2022',
      title: 'Reward: Tweet Storms and Blog Posts',
      avatarUrl: '/img/avatar.png',
      address: '0x41477A57A8916237A8ff512bA3D9bF487D9cbb79',
    },
    {
      daoTitle: 'Slink — Web3 Identity Platform',
      daoPublished: 'Jun 3, 2022',
      title: 'Reward: Tweet Storms and Blog Posts',
      avatarUrl: '/img/avatar.png',
      address: '0x41477A57A8916237A8ff512bA3D9bF487D9cbb79',
    },
    {
      daoTitle: 'Slink — Web3 Identity Platform',
      daoPublished: 'Jun 3, 2022',
      title: 'Reward: Tweet Storms and Blog Posts',
      avatarUrl: '/img/avatar.png',
      address: '0x41477A57A8916237A8ff512bA3D9bF487D9cbb79',
    },
  ];

  const userTags = [
    { tag: 'DAO Member', Icon: Award, Badge: true },
    { tag: 'Founder' },
    { tag: 'Product Manager' },
    { tag: 'Growth Manager' },
  ];

  return (
    <>
      <Head>
        <title>Slink — Profile — vladkooklev.sol</title>
      </Head>
      <PageHeader title="vladkooklev.sol" goBack={router.back} />
      <div className="container grid grid-cols-8 gap-8 px-24">
        <div className="col-span-full mt-2 h-fit overflow-hidden rounded-xl bg-primary pb-8">
          <div className="h-44">
            <Wallpaper isOwner={false} imgUrl="/img/userWallpaper.png" />
          </div>
          <div className="flex flex-col px-6">
            <div className="-mt-16 mb-6 flex">
              <div className="self-start">
                <Avatar
                  avatarSize="lg"
                  placeholder="V"
                  imgUrl="/img/userAvatar.png"
                />
              </div>
              <div className="mb-1 ml-4 flex w-full justify-end self-end">
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
            <span className="mb-1 text-xl font-bold">vladkooklev.sol</span>
            <div className="flex items-center text-light-300">
              <div className="text-sm">
                <span>{displayPublicKey(userId)}</span>
              </div>
              <div className="flex items-center">
                <DotSeparator />
                <span className="text-sm">vladkooklev.sol</span>
              </div>
            </div>
            <div className="mt-6 flex">
              {userTags.map(({ tag, Icon, Badge }, idx) => (
                <div
                  key={idx}
                  className={clsx(
                    'mr-2 flex items-center rounded px-2 py-1 text-sm text-light-500',
                    { 'bg-dark-300': !Badge, 'border border-dark-200': Badge }
                  )}
                >
                  {Icon && (
                    <div className="mr-1 text-accent-500">
                      <Icon />
                    </div>
                  )}
                  <span>{tag}</span>
                </div>
              ))}
            </div>
            <span className="mt-4 text-body text-light-500">
              Head of Product at @slinkcool – Helping in launching a million DAOs
              🚀
            </span>
          </div>
        </div>

        {/* about me */}
        <span className="col-span-full -mb-6 text-title-h2 text-light-500">
          About me
        </span>
        <div className="col-span-full rounded-xl bg-primary p-6">
          <span className="text-body text-light-500">
            Hi everyone - I am looking for a new role and would appreciate your
            support. Thank you in advance for any connections, advice, or
            opportunities you can offer.
          </span>
        </div>

        {/* daos */}
        <span className="col-span-full -mb-6 text-title-h2 text-light-500">
          DAOs
        </span>
        {daos.map(
          (
            { title, description, worksDuration, worksDate, avatarUrl },
            idx
          ) => (
            <div className="col-span-4" key={idx}>
              <DaoCard
                title={title}
                description={description}
                worksDuration={worksDuration || ''}
                worksDate={worksDate || ''}
                avatarUrl={avatarUrl}
              />
            </div>
          )
        )}

        {/* highlights */}
        <span className="col-span-full -mb-6 text-title-h2 text-light-500">
          Highlights
        </span>
        {highlights.map(
          ({ daoTitle, daoPublished, address, title, avatarUrl }, idx) => (
            <div key={idx} className="col-span-2">
              <HighlightCard
                daoTitle={daoTitle}
                daoPublished={daoPublished}
                address={address}
                title={title}
                avatarUrl={avatarUrl}
              />
            </div>
          )
        )}

        {/* skills */}
        <span className="col-span-full -mb-6 text-title-h2">Skills</span>
        {['Product Design', 'C++', 'JS'].map((skill) => {
          return (
            <div
              key={skill}
              className="col-span-4 flex flex-col overflow-hidden rounded-xl bg-primary p-6"
            >
              <span className="mb-3 text-subtitle-h2">{skill}</span>
              <div className="w-fit rounded bg-[#58735452] px-2 py-1 text-caption text-[#6BCC5B]">
                Confirmed by N users
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProfilePage;
