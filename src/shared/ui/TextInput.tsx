import { useCallback } from 'react';

interface TextInputProps {
  id: string;
  title?: string;
  placeholder?: string;
  value?: string;
  onTextChange?: (text: string) => void;
  onEnterPress?: (text: string) => void;
}

const TextInput = ({
  id,
  title,
  placeholder,
  value,
  onTextChange,
  onEnterPress,
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
    <div className="flex flex-col">
      {title && (
        <label htmlFor={id} className="mb-2 text-xs text-light-300">
          {title}
        </label>
      )}
      <input
        id={id}
        name={id}
        type="text"
        className="rounded border-none bg-dark-300 p-3 text-sm font-semibold text-white placeholder:text-light-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default TextInput;
