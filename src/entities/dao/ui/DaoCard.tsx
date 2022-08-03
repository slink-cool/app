import { EMPTY_ARR } from '@shared/defaults';
import React from 'react';
import Image from 'next/image';

interface DaoCardProps {
  title: string;
  description: string;
  avatarUrl?: string;
  tags?: string[];
}

const LogoFallback: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex aspect-square items-center justify-center bg-[#D3EDFF]">
    <span className="text-6xl text-[#819CAF]">{title[0]}</span>
  </div>
);

const DaoCard: React.FC<DaoCardProps> = ({
  title,
  description,
  avatarUrl,
  tags = EMPTY_ARR,
}) => {
  return (
    <div className="flex rounded-xl bg-dark-400 p-6">
      <div className="mr-4 aspect-square w-[72px] overflow-hidden rounded-full">
        {avatarUrl ? (
          <object data={avatarUrl} type="image/jpeg" className="w-[72px]">
            <LogoFallback title={title} />
          </object>
        ) : (
          <LogoFallback title={title} />
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <span className="mb-1 text-subtitle-h1">{title}</span>
          <span className="text-label text-light-400">{description}</span>
        </div>
        <div className="flex flex-row space-x-1">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-dark-300 py-1 px-2 text-caption">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DaoCard;
