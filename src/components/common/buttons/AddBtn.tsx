import { useState } from 'react';
import assets from '../../../assets';

function AddButton() {
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        setIsAdded(true);
    };

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
