import { memo } from 'react';
import assets from '../../../assets';

interface AddButtonProps {
  isChecked: boolean;
  handleChecked: (s: boolean) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ handleChecked, isChecked }) => {
  const handleClick = () => {
    handleChecked(!isChecked);
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-block rounded-lg px-4 py-2 ${
        isChecked ? 'bg-transparent text-white' : 'bg-transparent text-white'
      }`}
    >
      {isChecked ? (
        <img alt="done" src={assets.images.done} />
      ) : (
        <img alt="add" src={assets.images.addd} />
      )}
    </button>
  );
};

export default memo(AddButton);
