import React from 'react';
import Link from 'next/link';

interface BountieCardProps {
  avatarUrl?: string;
  daoTitle: string;
  daoPublished?: string;
  bountieTag?: string;
  bountieTitle: string;
  bountieReward: string;
  sourceUrl: string;
}

const LogoFallback: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex aspect-square items-center justify-center bg-[#D3EDFF]">
    <span className="text-6xl text-[#819CAF]">{title[0]}</span>
  </div>
);

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
            <div className="aspect-square w-[32px] overflow-hidden rounded-full">
              {avatarUrl ? (
                <object data={avatarUrl} type="image/jpeg" className="w-[32px]">
                  <LogoFallback title={daoTitle} />
                </object>
              ) : (
                <LogoFallback title={daoTitle} />
              )}
            </div>
            <div className="ml-3 flex flex-col">
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
            <div className="w-fit rounded bg-accent-500 px-2 py-1">
              <span className="text-label text-light-500">{bountieReward}</span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BountieCard;
