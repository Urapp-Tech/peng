import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import SelectedServiceCard from "./SelectedServicesCard";
import { useState } from "react";
import SelectProfessionalForServiceDialog from "@/components/common/dialog/SelectProfessionalForServiceDialog";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import MainHeading from "@/components/common/typography/MainHeading";

const SelectedServices = () => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((x) => x.bookingState);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<StoreService>();

  const showDialogForService = (s: StoreService) => {
    setSelectedService(s);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full h-full">
        <MainHeading title="Select Professional" />
        <div className="w-full flex h-full justify-between max-w-[1200px] mx-auto 20px] py-[40px]">
          <div className=" w-full main-tabs ">
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
