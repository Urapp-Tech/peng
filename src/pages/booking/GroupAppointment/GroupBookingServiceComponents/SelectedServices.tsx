import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import SelectedServiceCard from "./SelectedServicesCard";
import { useEffect, useState } from "react";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import MainHeading from "@/components/common/typography/MainHeading";
import { GroupBooking, setSelectedCustomer } from "@/redux/features/groupBookingSlice";
import GroupSelectProfessionalForServiceDialog from "@/components/common/dialog/GroupSelectProfessionalForServiceDialog";

const SelectedServices = () => {
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((x) => x.groupBookingState);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<StoreService>();
  const [customers, setCustomers] = useState<string[]>([]);

  const showDialogForService = (s: StoreService, customer: string) => {
    dispatch(setSelectedCustomer(customer));
    setSelectedService(s);
    setOpen(true);
  };

  useEffect(() => {
    const c = bookings.reduce((customers: string[], booking: GroupBooking) => {
      if (!customers.includes(booking.customer))
        customers.push(booking.customer);
      return customers;
    }, []);

    setCustomers(c);
  }, [bookings]);

  return (
    <>
      <div className="w-full h-full">
        <MainHeading title="Select Professional" />
          {customers?.map((customer, j) => (
            <div key={j} className="mt-3">
              {j > 0 && <hr />}
              <h1 className="mt-4 text-2xl"> {customer}</h1>
              <div className="w-full flex h-full justify-between max-w-[1200px] mx-auto 20px] ">
                <div className=" w-full main-tabs ">
                  {bookings
                    .filter((x) => x.customer == customer)
                    .map((b, i) => (
                      <SelectedServiceCard
                        key={i}
                        showDialog={(s) => showDialogForService(s, customer)}
                        booking={b}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        
      </div>

      <GroupSelectProfessionalForServiceDialog
        service={selectedService}
        open={open}
        handleClose={setOpen}
      />
    </>
  );
};

export default SelectedServices;
