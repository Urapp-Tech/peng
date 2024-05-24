import ProfessionalButton from '@/components/common/buttons/ProfessionalButton';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import { Booking } from '@/redux/features/bookingSlice';

interface CardProps {
  booking: Booking;
  showDialog: (val: StoreService) => void;
}
const SelectedServiceCard: React.FC<CardProps> = ({ booking, showDialog }) => {
  return (
    <div className="my-[20px] min-h-[160px] rounded-[20px] border-2 border-primary p-[20px]">
      <div className="flex flex-col items-start justify-between">
        <div className="p-2">
          <span className="mb-[10px] block text-[16px] font-bold leading-normal text-heading-color">
            {booking.service.name}
          </span>
          <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
            {booking.service.description}
          </span>
          <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
            {booking.service.price}
          </span>
        </div>
        <div className="p-2">
          <ProfessionalButton
            barber={booking.barber}
            onclick={() => showDialog(booking.service)}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectedServiceCard;
