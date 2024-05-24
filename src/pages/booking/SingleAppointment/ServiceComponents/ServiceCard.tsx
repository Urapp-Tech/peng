import AddButton from '@/components/common/buttons/AddBtn';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import { addService, removeService } from '@/redux/features/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY_SYMBOL } from '@/utils/constant';
import { memo, useEffect, useState } from 'react';

interface ServiceCardProps {
  service: StoreService;
  showServiceDetail?: (s: StoreService) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  showServiceDetail = (_s: StoreService) => {},
}) => {
  const { bookings } = useAppSelector((s) => s.bookingState);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState<boolean>(false);

  const handleAddButtonClick = (val: boolean) => {
    if (val) {
      dispatch(addService(service));
    } else {
      dispatch(removeService(service));
    }
  };

  useEffect(() => {
    const index = bookings.findIndex((x) => x.service.id === service.id);
    setChecked(index > -1);
  }, [bookings]);

  useEffect(() => {
    const index = bookings.findIndex((x) => x.service.id === service.id);
    setChecked(index > -1);
  }, []);

  return (
    <div className="bg-modals">
      <div>
        <div className="my-[20px] min-h-[160px] w-full rounded-[20px] border-2 border-primary bg-transparent p-[20px]">
          <div className="flex items-center justify-between">
            <div
              className="flex-1 cursor-pointer p-2 text-left"
              onClick={() => showServiceDetail(service)}
            >
              <span className="mb-[10px] block text-[16px] font-bold leading-normal text-heading-color">
                {service.name}
              </span>
              <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
                {service.description}
              </span>
              <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
                {CURRENCY_SYMBOL} {service.price}
              </span>
            </div>
            <div className="flex-2 p-2">
              <AddButton
                isChecked={checked}
                handleChecked={handleAddButtonClick}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ServiceCard);
