import { PublicKey } from '@solana/web3.js';
import React from 'react';

interface AvatarProps {
  title: string;
  imgUrl?: string;
}

const LogoFallback: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex aspect-square items-center justify-center bg-[#D3EDFF]">
    <span className="text-6xl text-[#819CAF]">{title[0]}</span>
  </div>
);

const Avatar = ({ title, imgUrl }: AvatarProps) => {
  return (
    <>
      <div className="flex aspect-square w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[#201D24] bg-[#D3EDFF]">
        {imgUrl ? (
          <object data={imgUrl} type="image/jpeg" className="w-32">
            <LogoFallback title={title} />
          </object>
        ) : (
          <LogoFallback title={title} />
        )}
      </div>
    </>
  );
};

export default Avatar;
