import { getFavoriteDomain } from '@bonfida/spl-name-service';
import { Connection, PublicKey } from '@solana/web3.js';

export const SWR_PROFILE_FAV_DOMAIN_KEY = 'profile/fav-domain';

export function fetchSnsFavoriteDomain(
  connection: Connection,
  owner: PublicKey
): ReturnType<typeof getFavoriteDomain> {
  return getFavoriteDomain(connection, owner);
}
