import AddButton from "@/components/common/buttons/AddBtn";
import CustomButton from "@/components/common/buttons/CustomButton";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import { addService, removeService } from "@/redux/features/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { CURRENCY_SYMBOL } from "@/utils/constant";
import { memo } from "react";

interface ServiceCardProps {
  service: StoreService;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {

    const { bookings } = useAppSelector(s => s.bookingState); 
    const dispatch = useAppDispatch();

    const handleAddButtonClick = (val: boolean) => {
        if(val) {
            dispatch(addService(service));
        }
        else {
            dispatch(removeService(service));
        }
    }

  return (
    <div className="bg-modals">
      <div>
        <div className="w-full bg-transparent border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px]">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-left p-2">
              <span className="block text-[16px] leading-normal font-bold text-heading-color mb-[10px]">
                {service.name}
              </span>
              <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">
                {service.description}
              </span>
              <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">
                {CURRENCY_SYMBOL} {service.price}
              </span>
            </div>
            <div className="flex-2 p-2">
              <AddButton isChecked={ bookings.find(x=> x.service.id == service.id) ? true : false } handleChecked={handleAddButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceCard);
