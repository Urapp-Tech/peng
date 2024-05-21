import AddButton from "@/components/common/buttons/AddBtn";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import { addService, removeService } from "@/redux/features/groupBookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { CURRENCY_SYMBOL } from "@/utils/constant";
import { memo, useEffect, useState } from "react";

interface ServiceCardProps {
  service: StoreService;
  showServiceDetail?: (s: StoreService ) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, showServiceDetail = (_s: StoreService) => {} }) => {

    const { bookings, selectedCustomer } = useAppSelector(s => s.groupBookingState); 
    const dispatch = useAppDispatch();
    const [checked , setChecked] = useState<boolean>(false);

    const handleAddButtonClick = (val: boolean) => {
        if(val) {
            dispatch(addService(service));
        }
        else {
            dispatch(removeService(service));
        }
    }

  useEffect(() => {
    const index = bookings.findIndex(x => x.service.id == service.id && x.customer == selectedCustomer);
    setChecked(index > -1 ? true : false)
  }, [bookings]);

  useEffect(() => {
    const index = bookings.findIndex(x => x.service.id == service.id && x.customer == selectedCustomer);
    setChecked(index > -1 ? true : false)
  }, []);

  return (
    <div className="bg-modals">
      <div>
        <div className="w-full bg-transparent border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px]">
          <div className="flex justify-between items-center">
            <div className="flex-1 text-left p-2 cursor-pointer" onClick={() => showServiceDetail(service)}>
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
              <AddButton isChecked={checked} handleChecked={handleAddButtonClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceCard);
