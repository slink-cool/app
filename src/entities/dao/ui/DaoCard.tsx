import { EMPTY_ARR } from '@shared/defaults';
import React from 'react';

interface DaoCardProps {
  title: string;
  description: string;
  avatarUrl?: string;
  tags?: string[];
}

const DaoCard: React.FC<DaoCardProps> = ({
  title,
  description,
  avatarUrl,
  tags = EMPTY_ARR,
}) => {
  return (
    <div className="flex bg-dark-400 p-6">
      <div className="mr-4 aspect-square w-[72px] rounded-full bg-teal-300" />
      <div className="flex flex-col justify-between">
        <div className="flex flex-col">
          <span className="text-subtitle-h1">{title}</span>
          <span className="text-label-medium text-light-400">
            {description}
          </span>
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
