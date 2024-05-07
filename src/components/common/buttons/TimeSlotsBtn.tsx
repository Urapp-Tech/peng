import { useState } from "react";

type Props={
    time: string;
}

const TimeSlotsBtn = ({time}:Props) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
      setIsActive(!isActive); // Toggle active state on click
    };
  return (
    <button  className={`w-full border-2 border-primary px-[5%] py-[15px] rounded-[20px] bg-white mb-[10px] ${
        isActive ? 'active' : ''
      }`}  onClick={handleClick}>
        <span className='block text-primary text-[16px] leading-normal font-bold text-left'>
           {time}
        </span>
    </button>
  )
}

export default TimeSlotsBtn