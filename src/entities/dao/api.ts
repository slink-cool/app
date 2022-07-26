import { EMPTY_ARR } from '@shared/defaults';
import { supabase } from '@shared/supabase';

export const SWR_DAOS_LIST_KEY = 'daos';

interface Dao {
  id: string;
  symbol: string;
  displayName?: string;
  logoUrl?: string;
}

export async function fetchDaosList(): Promise<Dao[]> {
  const res = await supabase
    .from('dao')
    .select('id, symbol, display_name, logo_url')
    .throwOnError();
  const data = res.data || EMPTY_ARR;

  return data.map((it) => ({
    id: it.id,
    symbol: it.symbol,
    displayName: it.display_name,
    logoUrl: it.logo_url,
  }));
}
