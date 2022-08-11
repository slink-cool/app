import React from 'react';
import Link from 'next/link';
import EditIcon from '@shared/icons/Edit.svg';
import { useRouter } from 'next/router';
import { ButtonEllipse } from '@shared/ui/index';

interface WallpaperProps {
  imgUrl?: string;
  isOwner?: boolean;
}

const Wallpaper = ({ imgUrl, isOwner }: WallpaperProps) => {
  const { query } = useRouter();

  return (
    <>
      <div className="flex items-center justify-center overflow-hidden bg-dark-300">
        {imgUrl ? (
          <object
            data={imgUrl}
            type="image/jpeg"
            className={'h-44 w-full object-cover'}
          />
        ) : (
          <div className="h-44 bg-dark-300" />
        )}
        {isOwner && (
          <div className="flex w-full justify-end self-start p-4">
            <Link
              href={{
                pathname: '/profiles/[id]/edit',
                query,
              }}
            >
              <ButtonEllipse>
                <EditIcon />
              </ButtonEllipse>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Wallpaper;
