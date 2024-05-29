import { useNavigate } from 'react-router-dom';
import assets from '../../../assets';
import { useAppDispatch } from '@/redux/redux-hooks';
import { clearBookings } from '@/redux/features/bookingSlice';
import { clearBookings as clearGroupBookings } from '@/redux/features/groupBookingSlice';

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCloseBooking = () => {
    dispatch(clearBookings());
    dispatch(clearGroupBookings());
    navigate('/');
  };

  return (
    <div className="w-full bg-primary py-[30px]">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent   disabled:pointer-events-none"
        >
          <img src={assets.images.leftArrow} alt="leftArrow" />
        </button>
        <div className="mx-[20px]">
          <img src={assets.images.logo} alt="logo" />
        </div>
        <button
          onClick={() => handleCloseBooking()}
          className="bg-transparent disabled:pointer-events-none"
        >
          <img src={assets.images.cross} alt="cross" />
        </button>
      </div>
    </div>
  );
}

export default Header;
