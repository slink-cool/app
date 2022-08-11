import React from 'react';
import { Avatar } from '@shared/ui';
import DotSeparator from '@shared/ui/DotSeparator';

interface DaoCardProps {
  title: string;
  description: string;
  avatarUrl?: string;
  worksDate?: string;
  worksDuration?: string;
}

const DaoCard: React.FC<DaoCardProps> = ({
  title,
  description,
  avatarUrl,
  worksDuration,
  worksDate,
}) => {
  return (
    <div className="flex cursor-pointer rounded-xl bg-dark-400 p-6 transition hover:ring-2 hover:ring-dark-300">
      <div className="mr-4">
        <Avatar avatarSize="md" imgUrl={avatarUrl} placeholder={title} />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex flex-col">
          <span className="mb-1 text-subtitle-h1">{title}</span>
          <span className="text-label text-light-400">{description}</span>
        </div>
        <div className="mt-4 flex items-center text-light-300">
          <span className="text-label">{worksDate}</span>
          <DotSeparator />
          <span className="text-label">{worksDuration}</span>
        </div>
      </div>
    </div>
  );
};

export default DaoCard;
