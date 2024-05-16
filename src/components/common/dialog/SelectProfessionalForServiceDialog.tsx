import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import MainHeading from "../typography/MainHeading";
import { SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { fetchCBarber } from "@/redux/features/barberSlice";
import ProfessionalAnyCard from "@/pages/booking/SingleAppointment/ProfessionalComponents/ProfessionalAnyCard";
import ProfessionalCard from "@/pages/booking/SingleAppointment/ProfessionalComponents/ProfessionalCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking, addAnyBarberOnSpecificService, addBarberOnSpecificService } from "@/redux/features/bookingSlice";
import { Barber } from "@/interfaces/barber";
import assets from "@/assets";
import { StoreService } from "@/interfaces/serviceCategory.interface";


interface SelectProfessionalForServiceDialogProps {
    service?: StoreService;
    open: boolean;
    handleClose: React.Dispatch<SetStateAction<boolean>>;
}

const SelectProfessionalForServiceDialog: React.FC<SelectProfessionalForServiceDialogProps> = ({service, handleClose, open = false}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((s) => s.bookingState);
  const { barbers, loading } = useAppSelector((s) => s.barberState);

  const handleProfessionalSelection = (barber: Barber) => {
    service && dispatch(addBarberOnSpecificService({service, barber}))
    handleClose(prev => !prev);
  }

  const handleAnyProfessionalSelection = (barber: Barber) => {
    service && dispatch(addAnyBarberOnSpecificService({service}))
    handleClose(prev => !prev);
  }

  useEffect(() => {
    if (bookings.length > 0) {
      dispatch(fetchCBarber(bookings.map((b: Booking) => b.service.id)));
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={() => handleClose(prev => !prev)}>
      <DialogContent className="max-w[800px] w-[500px] mx-auto bg-white rounded-lg shadow-md min-h-[600px]">
        <DialogHeader>
          <MainHeading title={service?.name || ''} />
        </DialogHeader>
        <div className="w-full grid grid-cols-12 gap-6 justify-between items-center flex-wrap">
          {loading &&
            Array(4)
              .fill("a")
              .map((b, i) => (
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
                checked={bookings.find((x) => x.barber?.id === b.id) != null}
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
      </DialogContent>
    </Dialog>
  );
};
export default SelectProfessionalForServiceDialog;
