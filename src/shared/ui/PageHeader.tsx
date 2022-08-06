import { Combobox } from '@headlessui/react';
import React, { useState } from 'react';
import SearchIcon from '@shared/icons/Search.svg';
import ArrowLeft from '@shared/icons/ArrowLeft.svg';
import clsx from 'clsx';

interface SearchProps {
  onGoToClick?: (query: string) => void;
  goToValidator?: (query: string) => boolean;
}

const Search: React.FC<SearchProps> = ({ onGoToClick, goToValidator }) => {
  const [query, setQuery] = useState('');

  const queryValidForGoto = goToValidator ? goToValidator?.(query) : true;

  return (
    <Combobox value={query} onChange={setQuery}>
      {({ open }) => (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-light-400">
            <SearchIcon />
          </div>
          <Combobox.Input
            className={clsx(
              'h-10 w-full rounded border-transparent bg-dark-300 p-3 pl-9 text-label text-white placeholder:text-light-400 focus:border-dark-200 focus:ring-0',
              open && 'rounded-b-none border-b-0'
            )}
            placeholder="Search"
            onChange={(event) => setQuery(event.target.value)}
          />

          <Combobox.Options className="absolute z-10 w-full truncate rounded-b border-x border-b border-dark-200 bg-dark-300 p-3">
            {onGoToClick && query.length > 0 && queryValidForGoto && (
              <Combobox.Option
                value={{ id: null, name: query }}
                onClick={() => onGoToClick(query)}
              >
                Go to {query}
              </Combobox.Option>
            )}
          </Combobox.Options>
        </div>
      )}
    </Combobox>
  );
};

interface PageHeaderProps extends SearchProps {
  title: string;
  hasSearch?: boolean;
  goBack?: () => void;
}

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
          <Search {...searchProps} />
        </div>
      )}
    </div>
  );
};

export default PageHeader;
