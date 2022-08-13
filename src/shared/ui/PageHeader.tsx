import ArrowLeft from '@shared/icons/ArrowLeft.svg';
import SearchIcon from '@shared/icons/Search.svg';
import React from 'react';
import Combobox, { ComboboxProps } from './Combobox';

type PageHeaderProps = {
  title: string;
  hasSearch?: boolean;
  goBack?: () => void;
} & Pick<ComboboxProps, 'onGoToClick' | 'goToValidator'>;

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  goBack,
  hasSearch,
  ...searchProps
}) => {
  return (
    <div className="container sticky top-0 mb-4 flex h-16 items-center justify-between border-b border-dark-300 bg-dark-500 px-24 py-3">
      <div className="flex items-center">
        <button onClick={goBack} className="mr-2 text-light-300">
          <ArrowLeft />
        </button>
        <h1 className="text-title-h2">{title}</h1>
      </div>
      {hasSearch && (
        <div className="w-56">
          <Combobox {...searchProps} Icon={SearchIcon} />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
