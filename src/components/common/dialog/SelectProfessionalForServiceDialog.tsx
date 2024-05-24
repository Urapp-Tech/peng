import assets from '@/assets';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Skeleton from '@/components/ui/skeleton';
import { Barber } from '@/interfaces/barber';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import ProfessionalAnyCard from '@/pages/booking/SingleAppointment/ProfessionalComponents/ProfessionalAnyCard';
import ProfessionalCard from '@/pages/booking/SingleAppointment/ProfessionalComponents/ProfessionalCard';
import { fetchCBarber } from '@/redux/features/barberSlice';
import {
  Booking,
  addAnyBarberOnSpecificService,
  addBarberOnSpecificService,
} from '@/redux/features/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import {} from '@radix-ui/react-dialog';
import { SetStateAction, useEffect } from 'react';

interface SelectProfessionalForServiceDialogProps {
  service?: StoreService;
  open: boolean;
  handleClose: React.Dispatch<SetStateAction<boolean>>;
}

const SelectProfessionalForServiceDialog: React.FC<
  SelectProfessionalForServiceDialogProps
> = ({ service, handleClose, open = false }) => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((s) => s.bookingState);
  const { barbers, loading } = useAppSelector((s) => s.barberState);

  const handleProfessionalSelection = (barber: Barber) => {
    service && dispatch(addBarberOnSpecificService({ service, barber }));
    handleClose((prev) => !prev);
  };

  const handleAnyProfessionalSelection = (_barber: Barber) => {
    service && dispatch(addAnyBarberOnSpecificService({ service }));
    handleClose((prev) => !prev);
  };

  useEffect(() => {
    if (bookings.length > 0) {
      dispatch(fetchCBarber(bookings.map((b: Booking) => b.service.id)));
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={() => handleClose((prev) => !prev)}>
      <DialogContent className="mx-auto h-auto w-[700px] max-w-[800px] grid-cols-12 rounded-lg bg-white shadow-md">
        <div className="col-span-12">
          <h1 className="my-[20px] h-6 text-[30px] font-normal text-heading-color">
            {service?.name || ''}
          </h1>
          <div className="mt-10 grid w-full grid-cols-12 gap-6 ">
            {loading &&
              Array(4)
                .fill('a')
                .map((_b, i) => (
                  <Skeleton
                    key={i}
                    className="col-span-4  h-[174px] rounded-xl border-2 border-primary "
                  />
                ))}
            {!loading &&
              barbers.map((b, i) => (
                <ProfessionalCard
                  professional={b}
                  onclick={handleProfessionalSelection}
                  key={i}
                  ratingIcon={assets.images.rank}
                  customClass="col-span-4 mr-[5px] mb-[10px] "
                />
              ))}

            <ProfessionalAnyCard
              title="Any Professional"
              onclick={handleAnyProfessionalSelection}
              avatarIcon={assets.images.groups}
              subTitle="for maximum availability"
              customClass="col-span-4 mr-[5px] mb-[10px]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SelectProfessionalForServiceDialog;
