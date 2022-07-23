interface TextInputProps {
  title?: string;
  placeholder?: string;
}

const TextInput = ({ title, placeholder }: TextInputProps) => {
  return (
    <label className="flex flex-col text-xs text-light-300">
      {title}
      <input
        type="text"
        className="mt-2 rounded border-none bg-dark-300 p-3 text-sm font-semibold text-white placeholder:text-light-400"
        placeholder={placeholder}
      />
    </label>
  );
};

export default TextInput;
