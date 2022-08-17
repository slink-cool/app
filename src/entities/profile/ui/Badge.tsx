import Award from '@shared/icons/Award.svg';

interface BadgeProps {
  title: string;
}

const Badge: React.FC<BadgeProps> = ({ title }) => {
  return (
    <div className="mr-2 flex items-center rounded border border-dark-200 px-2 py-1 text-sm text-light-500">
      <div className="mr-1 text-accent-500">
        <Award />
      </div>
      <span>{title}</span>
    </div>
  );
};

export default Badge;
