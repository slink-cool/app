import { PublicKey } from '@solana/web3.js';

interface AvatarProps {
  publicKey: PublicKey | string;
}

const Avatar = ({ publicKey }: AvatarProps) => {
  return (
    <div className="flex aspect-square w-32 items-center justify-center rounded-full border-4 border-[#201D24] bg-[#D3EDFF]">
      <span className="text-6xl text-[#819CAF]">{publicKey.toString()[0]}</span>
    </div>
  );
};

export default Avatar;
