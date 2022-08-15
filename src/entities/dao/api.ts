import { EMPTY_ARR } from '@shared/defaults';
import { supabase } from '@shared/supabase';

export const SWR_DAOS_LIST_KEY = 'daos';
export const SWR_DAO_KEY = 'dao';

interface Dao {
  id: string;
  symbol: string;
  displayName?: string;
  logoUrl?: string;
  twitter?: string | null;
  website?: string;
  firstVoting?: string;
  votersCount?: string;
}

export async function fetchDaosList(): Promise<Dao[]> {
  const res = await supabase
    .from('dao')
    .select('id, symbol, display_name, logo_url')
    .order('voters_count', { ascending: false })
    .throwOnError();
  const data = res.data || EMPTY_ARR;

  return data.map((it) => ({
    id: it.id,
    symbol: it.symbol,
    displayName: it.display_name,
    logoUrl: it.logo_url,
  }));
}

export async function fetchDao(id: string): Promise<Dao> {
  const { data } = await supabase
    .from('dao')
    .select(
      'id, symbol, display_name, logo_url, twitter, website, first_voting_at, voters_count'
    )
    .eq('id', id)
    .throwOnError()
    .maybeSingle();

  return {
    id,
    symbol: data.symbol,
    displayName: data.display_name,
    logoUrl: data.logo_url,
    twitter: data.twitter ? 'https://twitter.com/' + data.twitter : null,
    website: data.website,
    firstVoting: data.first_voting_at,
    votersCount: data.voters_count,
  };
}
