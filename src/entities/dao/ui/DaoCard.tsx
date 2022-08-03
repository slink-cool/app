import React from 'react';

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
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
          <span className="mb-1 text-subtitle-h1">{title}</span>
          <span className="text-label text-light-400">{description}</span>
        </div>
      </div>
    </div>
  );
};

export default DaoCard;
