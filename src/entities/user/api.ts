import { EMPTY_ARR, EMPTY_OBJ } from '@shared/defaults';
import { supabase } from '@shared/supabase';

export const SWR_USERS_LIST_KEY = 'users';
export const SWR_USER_KEY = 'user';

export interface User {
  id: string;
  displayName?: string;
  shortName?: string;
}

export async function fetchUser(id: string): Promise<User> {
  const { data } = await supabase
    .from('user')
    .select('display_name, short_name')
    .eq('id', id)
    .throwOnError()
    .maybeSingle();

  if (!data) {
    return { id };
  }

  return { id, displayName: data.display_name, shortName: data.short_name };
}

export async function updateUser(
  id: string,
  user: Omit<User, 'id'>
): Promise<User> {
  const { data } = await supabase
    .from('user')
    .update({ display_name: user.displayName, short_name: user.shortName })
    .eq('id', id)
    .throwOnError()
    .single();

  return {
    id,
    displayName: data.display_name,
    shortName: data.short_name,
  };
}

export async function listUsers(): Promise<readonly User[]> {
  const { data } = await supabase
    .from('user')
    .select('id, display_name, short_name')
    .throwOnError();

  if (!data) {
    return EMPTY_ARR;
  }

  return data.map(({ id, display_name, short_name }) => ({
    displayName: display_name,
    shortName: short_name,
    id,
  }));
}
