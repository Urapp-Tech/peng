import assets from '@/assets';
import MainHeading from '@/components/common/typography/MainHeading';
import Skeleton from '@/components/ui/skeleton';
import { Barber } from '@/interfaces/barber';
import { fetchCBarber, setBarbersEmpty } from '@/redux/features/barberSlice';
import {
  GroupBooking,
  addBarberToAll,
  removeBarberFromAll,
} from '@/redux/features/groupBookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessionalAnyCard from './GroupProfessionalComponents/ProfessionalAnyCard';
import ProfessionalCard from './GroupProfessionalComponents/ProfessionalCard';

const GroupBookingProfessionals = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector((s) => s.groupBookingState);
  const [selected, setSelected] = useState<string>('PerService');
  const { barbers, loading } = useAppSelector((s) => s.barberState);
  const handleAnyBarberClick = () => {
    dispatch(removeBarberFromAll());
  };

  const handleProfessionalSelection = (barber: Barber) => {
    dispatch(addBarberToAll(barber));
  };

  const SelectProfessionalPerService = () => {
    navigate('/booking/group-appointment/professionals-by-service');
  };

  useEffect(() => {
    const c = bookings.reduce((customers: string[], booking: GroupBooking) => {
      if (!customers.includes(booking.customer)) {
        customers.push(booking.customer);
      }
      return customers;
    }, []);

    if (bookings.length > 0 && c.length === 1) {
      dispatch(fetchCBarber(bookings.map((b: GroupBooking) => b.service.id)));
    } else {
      dispatch(setBarbersEmpty());
    }
  }, []);

  useEffect(() => {
    if (
      bookings.filter((x) => _.isUndefined(x.barber)).length === bookings.length
    ) {
      setSelected('Any');
    } else if (
      bookings.filter((x) => x.barber?.id === bookings[0].barber?.id).length ===
      bookings.length
    ) {
      setSelected('');
    } else {
      setSelected('PerService');
    }
  }, [bookings]);

  return (
    <>
      <MainHeading title="Select Professional" />

      <div className="grid w-full grid-cols-12 flex-wrap items-center justify-between gap-6">
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
              checked={bookings.find((x) => x.barber?.id === b.id) != null}
            />
          ))}

        <ProfessionalAnyCard
          title="Select Professional Per Service"
          avatarIcon={assets.images.service}
          onclick={SelectProfessionalPerService}
          customClass="col-span-4 mr-[5px] mb-[10px]"
          checked={selected === 'PerService'}
        />
        <ProfessionalAnyCard
          title="Any Professional"
          onclick={handleAnyBarberClick}
          avatarIcon={assets.images.groups}
          subTitle="for maximum availability"
          customClass="col-span-4 mr-[5px] mb-[10px]"
          checked={selected === 'Any'}
        />
      </div>
    </>
  );
};

export default memo(GroupBookingProfessionals);
