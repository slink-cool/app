import { useCallback } from 'react';

interface TextInputProps {
  title?: string;
  placeholder?: string;
  value?: string;
  onTextChange?: (text: string) => void;
}

const TextInput = ({
  title,
  placeholder,
  value,
  onTextChange,
}: TextInputProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onTextChange?.(e.target.value);
    },
    [onTextChange]
  );

  return (
    <label className="flex flex-col text-xs text-light-300">
      {title}
      <input
        type="text"
        className="mt-2 rounded border-none bg-dark-300 p-3 text-sm font-semibold text-white placeholder:text-light-400"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default TextInput;
