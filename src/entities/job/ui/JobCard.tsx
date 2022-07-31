import { Button } from '@shared/ui';
import Link from 'next/link';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  sourceUrl: string;
  salary?: string;
  logoBase64?: string;
}

const Separator = () => (
  <span className="mx-2 inline-block h-1 w-1 rounded-full bg-current" />
);

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
        <div className="mr-4 flex aspect-square h-[72px] items-center justify-center overflow-hidden rounded-full bg-slate-400">
          {logoBase64 ? (
            <img src={logoBase64} />
          ) : (
            <div className="text-6xl text-[#819CAF]">{company[0]}</div>
          )}
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
                <Separator />
                <span>{salary}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Link href={sourceUrl} passHref>
        <Button title="Read more" variant="secondary" as="a" />
      </Link>
    </div>
  );
};

export default JobCard;
