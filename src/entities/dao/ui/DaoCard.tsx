import React from 'react';
import { Avatar } from '@shared/ui';

interface DaoCardProps {
  title: string;
  description: string;
  avatarUrl?: string;
  tags?: string[];
}

const DaoCard: React.FC<DaoCardProps> = ({ title, description, avatarUrl }) => {
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
      </div>
    </div>
  );
};

export default DaoCard;
