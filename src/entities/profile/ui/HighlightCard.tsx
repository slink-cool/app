import React from 'react';
import Link from 'next/link';
import { Avatar } from '@shared/ui';

interface HighlightCardProps {
  avatarUrl?: string;
  daoTitle: string;
  daoPublished?: string;
  address: string;
  title: string;
  sourceUrl?: string;
}

const HighlightCard: React.FC<HighlightCardProps> = ({
  daoTitle,
  daoPublished,
  title,
  address,
  avatarUrl,
  sourceUrl,
}) => {
  return (
    <Link href={sourceUrl || ''} passHref>
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
              <span className="text-subtitle-h1 text-light-500">{title}</span>
              <span className="mt-4 break-words text-caption text-light-300">
                To: {address}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default HighlightCard;
