import clsx from 'clsx';

interface TagProps {
  title: string;
  Icon?: () => JSX.Element;
}

const Tag: React.FC<TagProps> = ({ title, Icon }) => {
  return (
    <div className="mr-2 flex items-center rounded bg-dark-300 px-2 py-1 text-sm text-light-500">
      {Icon && (
        <div className="mr-1 text-accent-500">
          <Icon />
        </div>
      )}
      <span>{title}</span>
    </div>
  );
};

export default Tag;
