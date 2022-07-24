import { PublicKey } from '@solana/web3.js';

export function displayPublicKey(pk: PublicKey | string) {
  const s = pk.toString();
  return `${s.slice(0, 4)}...${s.slice(s.length - 4)}`;
}
