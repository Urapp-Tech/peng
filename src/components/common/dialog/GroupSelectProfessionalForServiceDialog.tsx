import {
  DialogContent,
  Dialog
} from "@/components/ui/dialog";
import {  } from "@radix-ui/react-dialog";
import { SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { fetchCBarber } from "@/redux/features/barberSlice";
import ProfessionalAnyCard from "@/pages/booking/SingleAppointment/ProfessionalComponents/ProfessionalAnyCard";
import ProfessionalCard from "@/pages/booking/SingleAppointment/ProfessionalComponents/ProfessionalCard";
import { Skeleton } from "@/components/ui/skeleton";
import { GroupBooking, addAnyBarberOnSpecificService, addBarberOnSpecificService } from "@/redux/features/groupBookingSlice";
import { Barber } from "@/interfaces/barber";
import assets from "@/assets";
import { StoreService } from "@/interfaces/serviceCategory.interface";


interface GroupSelectProfessionalForServiceDialogProps {
    service?: StoreService;
    open: boolean;
    handleClose: React.Dispatch<SetStateAction<boolean>>;
}

const GroupSelectProfessionalForServiceDialog: React.FC<GroupSelectProfessionalForServiceDialogProps> = ({service, handleClose, open = false}) => {
  const dispatch = useAppDispatch();
  const { bookings, selectedCustomer } = useAppSelector((s) => s.groupBookingState);
  const { barbers, loading } = useAppSelector((s) => s.barberState);
  const [filterBarbers, setFilterBarbers] = useState<Barber[]>([])

  const handleProfessionalSelection = (barber: Barber) => {
    service && dispatch(addBarberOnSpecificService({service, barber}))
    handleClose(prev => !prev);
  }

  const handleAnyProfessionalSelection = (_barber: Barber) => {
    service && dispatch(addAnyBarberOnSpecificService({service}))
    handleClose(prev => !prev);
  }

  useEffect(() => {
    const b = barbers.filter(barber => bookings.filter(x=> x.customer !== selectedCustomer && x.barber?.id == barber.id).length == 0  );
    setFilterBarbers(b);
  }, [barbers])

  useEffect(() => {
    if (bookings.length > 0) {
      dispatch(fetchCBarber(bookings.reduce((uniqueIds: string[],b: GroupBooking) =>{ 
        if(!uniqueIds.includes(b.service.id)){
          uniqueIds.push(b.service.id);
        }
        return uniqueIds
      }, [])));
    }
  }, [selectedCustomer]);

  return (
    <Dialog  open={open} onOpenChange={() => handleClose(prev => !prev)}>
      <DialogContent className="max-w-[800px] w-[700px] mx-auto bg-white rounded-lg h-auto shadow-md grid-cols-12">
        <div className="col-span-12">
            <h1 className={`my-[20px] text-[30px] font-normal text-heading-color h-6`}>{service?.name || ''}</h1>
            <div className="w-full grid grid-cols-12 gap-6 mt-10 ">
            {loading &&
                Array(4)
                .fill("a")
                .map((_b, i) => (
                    <Skeleton
                    key={i}
                    className="col-span-4  h-[174px] rounded-xl border-2 border-primary "
                    />
                ))}
            {!loading &&
                filterBarbers.map((b, i) => (
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
export default GroupSelectProfessionalForServiceDialog;
