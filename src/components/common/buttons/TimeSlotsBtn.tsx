import { setAppointmentTime } from '@/redux/features/bookingSlice';
import { useAppDispatch } from '@/redux/redux-hooks';
import { Dayjs } from 'dayjs';

type Props = {
  time: Dayjs;
  active?: boolean;
};

const TimeSlotsBtn = ({ time, active = false }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(setAppointmentTime(time.format('YYYY-MM-DD HH:mm:ss')));
  };
  return (
    <button
      className={`mb-[10px] w-full rounded-[20px] border-2 border-primary bg-white px-[5%] py-[15px] ${
        active ? 'active' : ''
      }`}
      onClick={handleClick}
    >
      <span className="block text-left text-[16px] font-bold leading-normal text-primary">
        {time.format('h:mm A')}
      </span>
    </button>
  );
};

export default TimeSlotsBtn;
