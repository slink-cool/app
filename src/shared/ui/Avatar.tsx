import React from 'react';

interface AvatarProps {
  placeholder: string;
  avatarSize: 'sm' | 'md' | 'lg';
  imgUrl?: string;
}

const LogoFallback: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div className="flex aspect-square items-center justify-center bg-dark-300">
    <span className="text-5xl font-medium uppercase text-light-400">
      {placeholder[0]}
    </span>
  </div>
);

const Avatar = ({ placeholder, imgUrl, avatarSize }: AvatarProps) => {
  return (
    <>
      {avatarSize === 'lg' && (
        <div className="flex aspect-square w-[128px] items-center justify-center overflow-hidden rounded-full border-4 border-[#201D24] bg-dark-300">
          {imgUrl ? (
            <object data={imgUrl} type="image/jpeg" className="w-[128px]">
              <LogoFallback placeholder={placeholder} />
            </object>
          ) : (
            <LogoFallback placeholder={placeholder} />
          )}
        </div>
      )}
      {avatarSize === 'md' && (
        <div className="flex aspect-square w-[72px] items-center justify-center overflow-hidden rounded-full bg-dark-300">
          {imgUrl ? (
            <object data={imgUrl} type="image/jpeg" className="w-[72px]">
              <LogoFallback placeholder={placeholder} />
            </object>
          ) : (
            <LogoFallback placeholder={placeholder} />
          )}
        </div>
      )}
      {avatarSize === 'sm' && (
        <div className="flex aspect-square w-[40px] items-center justify-center overflow-hidden rounded-full bg-dark-300">
          {imgUrl ? (
            <object data={imgUrl} type="image/jpeg" className="w-[40px]">
              <LogoFallback placeholder={placeholder} />
            </object>
          ) : (
            <LogoFallback placeholder={placeholder} />
          )}
        </div>
      )}
    </>
  );
};

export default Avatar;
