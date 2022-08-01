import ArrowLeft from '../icons/ArrowLeft.svg';
import Search from '../icons/Search.svg';
import TextInput from './TextInput';

interface PageHeaderProps {
  title: string;
  goBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, goBack }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button onClick={goBack} className="mr-2 text-light-300">
          <ArrowLeft />
        </button>
        <h1 className="text-title-h1">{title}</h1>
      </div>
      <div className="w-56">
        <TextInput
          id="search"
          placeholder="Search"
          leftAdornment={<Search />}
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default PageHeader;
