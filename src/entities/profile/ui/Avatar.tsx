import { PublicKey } from '@solana/web3.js';

interface AvatarProps {
  placeholder: string;
}

const Avatar = ({ placeholder }: AvatarProps) => {
  return (
    <div className="flex aspect-square w-32 items-center justify-center rounded-full border-4 border-[#201D24] bg-[#D3EDFF]">
      <span className="text-6xl text-[#819CAF]">{placeholder[0]}</span>
    </div>
  );
};

export default Avatar;
