import React from 'react';
import Link from 'next/link';
import { Avatar } from '@shared/ui';

interface BountieCardProps {
  avatarUrl?: string;
  daoTitle: string;
  daoPublished?: string;
  bountieTag?: string;
  bountieTitle: string;
  bountieReward: string;
  sourceUrl: string;
}

const BountieCard: React.FC<BountieCardProps> = ({
  daoTitle,
  daoPublished,
  bountieTag,
  bountieTitle,
  bountieReward,
  avatarUrl,
  sourceUrl,
}) => {
  return (
    <Link href={sourceUrl} passHref>
      <a target="_blank">
        <div className="flex h-[20rem] cursor-pointer flex-col rounded-xl bg-dark-400 p-6 transition hover:ring-2 hover:ring-dark-300">
          <div className="flex items-center">
            <div className="mr-2">
              <Avatar
                avatarSize="sm"
                imgUrl={avatarUrl}
                placeholder={daoTitle}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-label text-light-400">{daoTitle}</span>
              <span className="mt-1 text-caption text-light-300">
                {daoPublished}
              </span>
            </div>
          </div>
          <div className="mt-12 flex h-full flex-col justify-between">
            <div className="flex flex-col">
              <span className="text-caption text-light-300">{bountieTag}</span>
              <span className="mt-2 text-subtitle-h1 text-light-500">
                {bountieTitle}
              </span>
            </div>
            <div className="w-fit rounded bg-dark-300 px-2 py-1">
              <span className="text-label text-light-500">{bountieReward}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BountieCard;
