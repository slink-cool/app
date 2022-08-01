import { ExecOptionsWithStringEncoding } from 'child_process';
import clsx from 'clsx';
import { useCallback } from 'react';

interface TextInputProps {
  id: string;
  title?: string;
  placeholder?: string;
  value?: string;
  onTextChange?: (text: string) => void;
  onEnterPress?: (text: string) => void;
  leftAdornment?: React.ReactNode;
  className?: string;
}

const TextInput = ({
  id,
  title,
  placeholder,
  value,
  onTextChange,
  onEnterPress,
  leftAdornment,
  className,
}: TextInputProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onTextChange?.(e.target.value);
    },
    [onTextChange]
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onEnterPress?.(e.target.value);
      }
    },
    [onEnterPress]
  );

  return (
    <div className="flex w-full flex-1 flex-col">
      {title && (
        <label htmlFor={id} className="mb-2 text-xs text-light-300">
          {title}
        </label>
      )}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-light-400">
          {leftAdornment}
        </div>
        <input
          id={id}
          name={id}
          type="text"
          className={clsx(
            'rounded border-none bg-dark-300 p-3 text-label text-white placeholder:text-light-400 focus:border-dark-200 focus:ring-dark-200',
            className
          )}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
      </div>
    </div>
  );
};

export default TextInput;
