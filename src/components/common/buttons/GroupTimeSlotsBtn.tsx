import { setAppointmentTime } from "@/redux/features/groupBookingSlice";
import { useAppDispatch } from "@/redux/redux-hooks";
import { Dayjs } from "dayjs";

type Props={
    time: Dayjs;
    active?: boolean;
}

const GroupTimeSlotsBtn = ({time,active = false}:Props) => {

  const dispatch = useAppDispatch();

    const handleClick = () => {
      dispatch(setAppointmentTime(time.format('YYYY-MM-DD HH:mm:ss')))
    };
  return (
    <button  className={`w-full border-2 border-primary px-[5%] py-[15px] rounded-[20px] bg-white mb-[10px] ${
        active ? 'active' : ''
      }`}  onClick={handleClick}>
        <span className='block text-primary text-[16px] leading-normal font-bold text-left'>
           {time.format("h:mm A")}
        </span>
    </button>
  )
}

export default GroupTimeSlotsBtn