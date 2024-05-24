import { Dialog, DialogContent } from '@/components/ui/dialog';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import { addService, removeService } from '@/redux/features/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import CustomButton from '../buttons/CustomButton';

type Props = {
  service: StoreService;
  open: boolean;
  handleClose: React.Dispatch<React.SetStateAction<boolean>>;
};
const ServiceDetailDialog = ({ service, open, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((s) => s.bookingState);

  const handleAddButtonClick = (val: boolean) => {
    if (val) {
      dispatch(addService(service));
    } else {
      dispatch(removeService(service));
    }
  };

  return (
    <div className="bg-modals">
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="custom-modal bg-white">
          <div className="flex items-center justify-between">
            <div className="">
              <span className="mb-[20px] block text-[16px] font-bold leading-normal text-heading-color">
                {service.name}
              </span>
              <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
                {service.description}
              </span>
            </div>
          </div>
          <div className="my-[5px] flex items-center justify-between">
            <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
              Price
            </span>
            <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
              {service.price}
            </span>
          </div>
          <div className="my-[20px] ">
            {bookings.find((x) => x.service.id === service.id) ? (
              <CustomButton
                title="Remove"
                customWidth="w-full"
                onclick={() => handleAddButtonClick(false)}
                customclass="rounded-[10px] bg-primary text-white"
              />
            ) : (
              <CustomButton
                title="Add"
                customWidth="w-full"
                onclick={() => handleAddButtonClick(true)}
                customclass="rounded-[10px] bg-primary text-white"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ServiceDetailDialog;
