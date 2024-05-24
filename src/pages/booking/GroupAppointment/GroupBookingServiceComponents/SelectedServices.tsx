import GroupSelectProfessionalForServiceDialog from '@/components/common/dialog/GroupSelectProfessionalForServiceDialog';
import MainHeading from '@/components/common/typography/MainHeading';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import {
  GroupBooking,
  setSelectedCustomer,
} from '@/redux/features/groupBookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { useEffect, useState } from 'react';
import SelectedServiceCard from './SelectedServicesCard';

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
    const c = bookings.reduce(
      (bookingsCustomers: string[], booking: GroupBooking) => {
        if (!bookingsCustomers.includes(booking.customer))
          bookingsCustomers.push(booking.customer);
        return bookingsCustomers;
      },
      []
    );

    setCustomers(c);
  }, [bookings]);

  return (
    <>
      <div className="h-full w-full">
        <MainHeading title="Select Professional" />
        {customers?.map((customer, j) => (
          <div key={j} className="mt-3">
            {j > 0 && <hr />}
            <h1 className="mt-4 text-2xl"> {customer}</h1>
            <div className="20px] mx-auto flex h-full w-full max-w-[1200px] justify-between ">
              <div className=" main-tabs w-full ">
                {bookings
                  .filter((x) => x.customer === customer)
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
