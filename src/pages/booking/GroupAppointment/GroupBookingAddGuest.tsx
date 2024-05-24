import assets from '@/assets';
import UserOptionDropDown from '@/components/common/dropdown/UserOptionDropDown';
import MainHeading from '@/components/common/typography/MainHeading';
import { Button } from '@/components/ui/button';
import {
  GroupBooking,
  removeAllServiceOfCustomer,
  setSelectedCustomer,
} from '@/redux/features/groupBookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { PlusIcon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupBookingAddGuest = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookings, mainCustomer } = useAppSelector((x) => x.groupBookingState);
  const [customers, setCustomers] = useState<string[]>([]);

  const handleAddGuestClick = () => {
    dispatch(setSelectedCustomer(`Guest ${customers.length}`));
    navigate('/booking/group-appointment/services');
  };

  const handleEditService = (customer: string) => {
    dispatch(setSelectedCustomer(customer));
    navigate('/booking/group-appointment/services');
  };

  const handleRemoveGuest = (customer: string) => {
    dispatch(removeAllServiceOfCustomer(customer));
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
      <MainHeading title="Select Services" />

      <div className="peng-services-area mt-10">
        {customers.map((customer, i) => (
          <div
            key={i}
            className="my-[20px] min-h-[160px] w-full content-center rounded-[20px] border-2 border-primary bg-transparent p-[20px]"
          >
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-3 flex justify-center">
                <img src={assets.images.avatar} alt="" />
              </div>
              <div className="col-span-6">
                <h1 className="text-lg">{customer}</h1>
                <h6 className="text-sm">
                  {bookings.filter((x) => x.customer === customer).length}{' '}
                  Service (s)
                </h6>
              </div>
              <div className="col-span-3">
                {mainCustomer === customer && (
                  <UserOptionDropDown
                    title="Options"
                    items={[
                      {
                        titles: 'Edit Services',
                        callback: () => handleEditService(customer),
                      },
                    ]}
                  />
                )}
                {mainCustomer !== customer && (
                  <UserOptionDropDown
                    title="Options"
                    items={[
                      {
                        titles: 'Edit Services',
                        callback: () => handleEditService(customer),
                      },
                      {
                        titles: 'Remove Guest',
                        callback: () => handleRemoveGuest(customer),
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={handleAddGuestClick}
        className=" my-[20px] content-center rounded-[20px] border-2 border-primary p-[20px]"
      >
        Add Guest
        <PlusIcon className="mx-3 text-primary" />
      </Button>
    </>
  );
};

export default memo(GroupBookingAddGuest);
