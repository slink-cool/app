import React from 'react';

interface WallpaperProps {
  imgUrl?: string;
}

const Wallpaper = ({ imgUrl }: WallpaperProps) => {
  return (
    <>
      <div className="flex items-center justify-center overflow-hidden bg-[#D3EDFF]">
        {imgUrl ? (
          <object
            data={imgUrl}
            type="image/jpeg"
            className={'h-44 w-full object-cover'}
          />
        ) : (
          <div className="h-44 bg-[#D3EDFF]" />
        )}
      </div>
    </>
  );
};

export default Wallpaper;
