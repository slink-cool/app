import { Avatar, Button } from '@shared/ui';
import Link from 'next/link';
import React from 'react';
import DotSeparator from '@shared/ui/DotSeparator';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  sourceUrl: string;
  salary?: string;
  logoBase64?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  sourceUrl,
  salary,
  logoBase64,
}) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-xl bg-primary p-6">
      <div className="flex flex-row">
        <div className="mr-4">
          <Avatar
            avatarSize="md"
            imgUrl={logoBase64}
            placeholder={company[0]}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <span className="mb-1 text-subtitle-h1">{title}</span>
            <span className="text-label text-light-400">{company}</span>
          </div>

          <div className="flex items-center text-label text-light-300">
            <span>{location}</span>
            {salary && (
              <>
                <DotSeparator />
                <span>{salary}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Link href={sourceUrl} passHref>
        <a target="_blank">
          <Button title="Read more" variant="secondary" as="a" />
        </a>
      </Link>
    </div>
  );
};

export default JobCard;
