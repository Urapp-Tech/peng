import ProfessionalButton from "@/components/common/buttons/ProfessionalButton";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import { Booking } from "@/redux/features/bookingSlice";

interface CardProps {
    booking: Booking
    showDialog: (val: StoreService) => void;
} 
const SelectedServiceCard:React.FC<CardProps> = ({booking, showDialog}) => {


    return (
        <>
              <div className="border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px]">
                <div className="flex justify-between items-start flex-col">
                    <div className="p-2">
                        <span className="block text-[16px] leading-normal font-bold text-heading-color mb-[10px]">{booking.service.name}</span>
                        <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{booking.service.description}</span>
                        <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">{booking.service.price}</span>
                    </div>
                    <div className="p-2">
                        <ProfessionalButton barber={booking.barber} onclick={() => showDialog(booking.service)} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectedServiceCard;