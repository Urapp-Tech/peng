import assets from "@/assets";
import MainHeading from "@/components/common/typography/MainHeading";
import { fetchCBarber } from "@/redux/features/barberSlice";
import { Booking, addBarberToAll, removeBarberFromAll } from "@/redux/features/bookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfessionalCard from "./ProfessionalComponents/ProfessionalCard";
import ProfessionalAnyCard from "./ProfessionalComponents/ProfessionalAnyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Barber } from "@/interfaces/barber";

const Professionals = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { bookings } = useAppSelector(s => s.bookingState)
  const { barbers , loading } = useAppSelector(s => s.barberState)
  const handleAnyBarberClick = () => {
    dispatch(removeBarberFromAll());
  };

  const handleProfessionalSelection = (barber: Barber) => {
    dispatch(addBarberToAll(barber))
  }

  const SelectProfessionalPerService = () => {
    navigate("/booking/appointment/professionals-by-service")
  }


  useEffect(() => {
    if(bookings.length > 0 ){
      dispatch(fetchCBarber( bookings.map((b: Booking) => (b.service.id))));
    }
  }, []);

  return (
    <>
      <MainHeading title="Select Professional" />

      <div className="w-full grid grid-cols-12 gap-6 justify-between items-center flex-wrap">
        {loading && Array(4).fill('a').map((b, i) => (
          <Skeleton key={i} className="col-span-4  h-[174px] rounded-xl border-2 border-primary "/>
        ))}
        {!loading && barbers.map((b, i) => (
          <ProfessionalCard
            professional={b}
            onclick={handleProfessionalSelection}
            key={i}
            ratingIcon={assets.images.rank}
            customClass="col-span-4 mr-[5px] mb-[10px] "
            checked={bookings.find(x => x.barber?.id === b.id ) != null}
          />
        ))}

        <ProfessionalAnyCard
          title="Select Professional Per Service"
          avatarIcon={assets.images.service}
          onclick={SelectProfessionalPerService}
          customClass="col-span-4 mr-[5px] mb-[10px]"
        />
        <ProfessionalAnyCard
          title="Any Professional"
          onclick={handleAnyBarberClick}
          avatarIcon={assets.images.groups}
          subTitle="for maximum availability"
          customClass="col-span-4 mr-[5px] mb-[10px]"
        />
      </div>
    </>
  );
};

export default memo(Professionals);
