import { useEffect, useState } from 'react';
import assets from '../../../assets';

interface AddButtonProps {
    isChecked: boolean;
    handleChecked: (s: boolean) => void;
} 

const AddButton: React.FC<AddButtonProps> = ({handleChecked, isChecked}) => {
    const [isAdded, setIsAdded] = useState(isChecked);

    const handleClick = () => {
        setIsAdded(!isAdded);
        handleChecked(!isAdded)
    };

    useEffect(() => {
        setIsAdded(isAdded)
    }, [isChecked])

    return (
        <button
            onClick={handleClick}
            className={`inline-block px-4 py-2 rounded-lg ${isAdded ? 'bg-transparent text-white' : 'bg-transparent text-white'}`}
        >
            {isAdded ? <img src={assets.images.done} /> : <img src={assets.images.addd} />}
        </button>
    );
}

export default AddButton;
