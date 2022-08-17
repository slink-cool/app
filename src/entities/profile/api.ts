import { getFavoriteDomain } from '@bonfida/spl-name-service';
import { EMPTY_ARR } from '@shared/defaults';
import { supabase } from '@shared/supabase';
import { Connection, PublicKey } from '@solana/web3.js';
import { Skill } from './types';

export const SWR_PROFILE_SNS_FAV_DOMAIN_KEY = 'profile/fav-domain';

export const SWR_AVAILABLE_SKILLS_KEY = 'profile/available-skills';

export const SWR_PROFILE_SKILLS_KEY = 'profile/skills';

export const SWR_PROFILE_ACHIEVEMNTS_KEY = 'profile/achievements';

export function fetchSnsFavoriteDomain(
  connection: Connection,
  owner: PublicKey
): ReturnType<typeof getFavoriteDomain> {
  return getFavoriteDomain(connection, owner);
}

export async function fetchAvailableSkills(): Promise<readonly Skill[]> {
  const { data } = await supabase
    .from('skill')
    .select('id, title')
    .throwOnError();

  if (!data) {
    return EMPTY_ARR;
  }

  return data.map(({ id, title }) => ({ id, title }));
}

export async function fetchUserSkills(
  userId: string
): Promise<readonly Skill[]> {
  const { data } = await supabase
    .from('skill_on_user')
    .select(
      `
      skill(id, title)
      `
    )
    .eq('user_id', userId)
    .throwOnError();

  if (!data) {
    return EMPTY_ARR;
  }

  return data.map(({ skill: { id, title } }) => ({ id, title }));
}

export async function addSkill(userId: string, skillId: string): Promise<void> {
  await supabase.from('skill_on_user').insert({
    user_id: userId,
    skill_id: skillId,
  });
}

export async function removeSkill(
  userId: string,
  skillId: string
): Promise<void> {
  await supabase
    .from('skill_on_user')
    .delete()
    .eq('user_id', userId)
    .eq('skill_id', skillId);
}

export async function fetchAchievements(userId: string): Promise<{
  daoMember: boolean;
  deployer: boolean;
  daoVoter: boolean;
}> {
  const [member, deployer, voter] = await Promise.allSettled([
    supabase.from('member').select('id').eq('id', userId),
    supabase.from('deployer').select('id').eq('id', userId),
    supabase.from('voter').select('id').eq('id', userId),
  ]);

  console.log('achievemets', { member, deployer, voter });

  return {
    daoMember:
      member.status === 'fulfilled' && Boolean(member.value.data?.length),
    deployer:
      deployer.status === 'fulfilled' && Boolean(deployer.value.data?.length),
    daoVoter: voter.status === 'fulfilled' && Boolean(voter.value.data?.length),
  };
}
