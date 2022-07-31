import { EMPTY_ARR } from '@shared/defaults';
import { supabase } from '@shared/supabase';

export const SWR_JOBS_KEY = 'jobs';

interface Job {
  id: string;
  title: string;
  organizationName: string;
  salary?: string;
  location: string;
  tags: string[];
  sourceUrl: string;
  logoBase64?: string;
  isRemote: boolean;
}

export async function fetchJobs(): Promise<readonly Job[]> {
  const { data } = await supabase
    .from('job')
    .select(
      'id,title,organization_name,salary,location,tags,description_url,logo_base64,is_remote'
    )
    .not('logo_base64', 'is', null)
    .throwOnError();

  if (!data) {
    return EMPTY_ARR;
  }

  return data.map((job) => ({
    id: job.id,
    title: job.title,
    organizationName: job.organization_name,
    salary: job.salary,
    location: job.location,
    tags: job.tags,
    sourceUrl: job.description_url,
    logoBase64: job.logo_base64,
    isRemote: job.is_remote,
  }));
}
