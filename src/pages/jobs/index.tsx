import { fetchJobs, JobCard, SWR_JOBS_KEY } from '@entities/job';
import { EMPTY_ARR } from '@shared/defaults';
import { PageHeader } from '@shared/ui';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const JobsPage: NextPage = () => {
  const router = useRouter();
  const { data: jobs = EMPTY_ARR, isLoading } = useSWR(SWR_JOBS_KEY, fetchJobs);

  return (
    <>
      <div className="container sticky top-0 bg-dark-500 mb-4 border-b border-dark-300 px-24 py-4">
        <PageHeader title="Jobs" goBack={router.back} />
      </div>
      <div className="container grid grid-cols-8 gap-6 px-24">
        {isLoading &&
          [...Array(6)].map((it) => (
            <div key={it} className="col-span-8 overflow-hidden rounded-xl">
              <div className="h-[120px] animate-pulse bg-primary" />
            </div>
          ))}
        {jobs.map((job) => (
          <div key={job.id} className="col-span-8">
            <JobCard
              title={job.title}
              company={job.organizationName}
              location={job.location}
              sourceUrl={job.sourceUrl}
              salary={job.salary}
              logoBase64={job.logoBase64}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default JobsPage;
