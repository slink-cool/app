import { Combobox } from '@headlessui/react';
import React, { useState } from 'react';
import SearchIcon from '../icons/Search.svg';
import ArrowLeft from '../icons/ArrowLeft.svg';
import clsx from 'clsx';

interface SearchProps {
  goToAvailable?: boolean;
  onGoToClick?: (query: string) => void;
  goToValidator?: (query: string) => boolean;
}

const Search: React.FC<SearchProps> = ({
  goToAvailable,
  onGoToClick,
  goToValidator,
}) => {
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
              'w-full rounded border-transparent bg-dark-300 p-3 pl-9 text-label text-white placeholder:text-light-400 focus:border-dark-200 focus:ring-0',
              open && 'rounded-b-none border-b-0'
            )}
            placeholder="Search"
            onChange={(event) => setQuery(event.target.value)}
          />

          <Combobox.Options className="absolute z-10 w-full truncate rounded-b border-x border-b border-dark-200 bg-dark-300 p-3">
            {goToAvailable && query.length > 0 && queryValidForGoto && (
              <Combobox.Option
                value={{ id: null, name: query }}
                onClick={() => onGoToClick?.(query)}
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
  goBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  goBack,
  ...searchProps
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={goBack} className="mr-2 text-light-300">
          <ArrowLeft />
        </button>
        <h1 className="text-title-h1">{title}</h1>
      </div>
      <div className="w-56">
        <Search {...searchProps} />
      </div>
    </div>
  );
};

export default PageHeader;
