import { Combobox as BaseCombobox } from '@headlessui/react';
import { EMPTY_ARR, NOOP } from '@shared/defaults';
import clsx from 'clsx';
import { useState } from 'react';

type Option = {
  id: string;
  title?: string;
};

export interface ComboboxProps {
  value?: Option;
  placeholder?: string;
  options?: readonly Option[];
  Icon?: () => JSX.Element;
  onChange?: (id: string) => void;
  onGoToClick?: (query: string) => void;
  goToValidator?: (query: string) => boolean;
}

const Combobox: React.FC<ComboboxProps> = ({
  value,
  placeholder = 'Search',
  options = EMPTY_ARR,
  Icon,
  onChange = NOOP,
  onGoToClick,
  goToValidator,
}) => {
  const [query, setQuery] = useState('');

  const queryValidForGoto = goToValidator ? goToValidator?.(query) : true;

  const filteredOptions = options.filter((option) =>
    option.title?.includes(query)
  );

  return (
    <BaseCombobox value={value} onChange={(option) => onChange(option!.id)}>
      {({ open }) => (
        <div className="relative">
          {Icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-light-400">
              <Icon />
            </div>
          )}
          <BaseCombobox.Input
            className={clsx(
              'h-10 w-full rounded border-transparent bg-dark-300 p-3 text-label text-white placeholder:text-light-400 focus:border-dark-200 focus:ring-0',
              Icon && 'pl-9',
              open && 'rounded-b-none border-b-0'
            )}
            placeholder={placeholder}
            onChange={(event) => setQuery(event.target.value)}
          />

          <BaseCombobox.Options className="absolute z-10 w-full truncate rounded-b border-x border-b border-dark-200 bg-dark-300">
            <>
              {onGoToClick && query.length > 0 && queryValidForGoto && (
                <BaseCombobox.Option
                  className="cursor-pointer p-3 hover:bg-dark-200"
                  value={{ id: 'goto' }}
                  onClick={() => onGoToClick(query)}
                >
                  Go to {query}
                </BaseCombobox.Option>
              )}
              {filteredOptions.map((option) => (
                <BaseCombobox.Option
                  className="cursor-pointer p-3 hover:bg-dark-200"
                  key={option.id}
                  value={option}
                >
                  {option.title || option.id}
                </BaseCombobox.Option>
              ))}
            </>
          </BaseCombobox.Options>
        </div>
      )}
    </BaseCombobox>
  );
};

export default Combobox;
