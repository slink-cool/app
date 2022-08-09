import React from 'react';

interface AvatarProps {
  placeholder: string;
  imgUrl?: string;
}

const LogoFallback: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div className="flex aspect-square items-center justify-center bg-[#D3EDFF]">
    <span className="text-6xl font-medium uppercase text-[#819CAF]">
      {placeholder[0]}
    </span>
  </div>
);

const Avatar = ({ placeholder, imgUrl }: AvatarProps) => {
  return (
    <>
      <div className="flex aspect-square w-32 items-center justify-center overflow-hidden rounded-full border-4 border-[#201D24] bg-[#D3EDFF]">
        {imgUrl ? (
          <object data={imgUrl} type="image/jpeg" className="w-32">
            <LogoFallback placeholder={placeholder} />
          </object>
        ) : (
          <LogoFallback placeholder={placeholder} />
        )}
      </div>
    </>
  );
};

export default Avatar;
