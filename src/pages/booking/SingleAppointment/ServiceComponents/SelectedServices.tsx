import SelectProfessionalForServiceDialog from '@/components/common/dialog/SelectProfessionalForServiceDialog';
import MainHeading from '@/components/common/typography/MainHeading';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import { useAppSelector } from '@/redux/redux-hooks';
import { useState } from 'react';
import SelectedServiceCard from './SelectedServicesCard';

const SelectedServices = () => {
  const { bookings } = useAppSelector((x) => x.bookingState);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<StoreService>();

  const showDialogForService = (s: StoreService) => {
    setSelectedService(s);
    setOpen(true);
  };

  return (
    <>
      <div className="h-full w-full">
        <MainHeading title="Select Professional" />
        <div className="20px] mx-auto flex h-full w-full max-w-[1200px] justify-between py-[40px]">
          <div className=" main-tabs w-full ">
            {bookings.map((booking, i) => (
              <SelectedServiceCard
                key={i}
                showDialog={showDialogForService}
                booking={booking}
              />
            ))}
          </div>
        </div>
      </div>

      <SelectProfessionalForServiceDialog
        service={selectedService}
        open={open}
        handleClose={setOpen}
      />
    </>
  );
};

export default SelectedServices;
