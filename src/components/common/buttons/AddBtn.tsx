import { memo } from "react";
import assets from "../../../assets";

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
      className={`inline-block px-4 py-2 rounded-lg ${
        isChecked ? "bg-transparent text-white" : "bg-transparent text-white"
      }`}
    >
      {isChecked ? (
        <img src={assets.images.done} />
      ) : (
        <img src={assets.images.addd} />
      )}
    </button>
  );
};

export default memo(AddButton);
