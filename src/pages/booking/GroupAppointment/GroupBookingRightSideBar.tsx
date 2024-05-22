import { useAppSelector } from "@/redux/redux-hooks";
import { CURRENCY_SYMBOL } from "@/utils/constant";
import _ from "lodash";
import { memo, useEffect, useState } from "react";
import SubHeading from "@/components/common/typography/SubHeading";
import { GroupBooking } from "@/redux/features/groupBookingSlice";
import dayjs from "dayjs";
import { CalendarIcon, Clock5Icon } from "lucide-react";

interface RightSideBarProps {
  continueAction: (p: string) => void;
}

const GroupBookingRightSideBar: React.FC<RightSideBarProps> = ({
  continueAction,
}) => {
  const { bookings , appointmentTime } = useAppSelector((x) => x.groupBookingState);
  const { systemConfig } = useAppSelector((x) => x.appState);
  const [customers, setCustomers] = useState<string[]>([]);

  useEffect(() => {
    const c = bookings.reduce((customers: string[], booking: GroupBooking) => {
      if (!customers.includes(booking.customer)) {
        customers.push(booking.customer);
      }
      return customers;
    }, []);

    setCustomers(c);
  }, [bookings]);

  return (
    <>
      <div className="w-full p-5 pb-0  border-2 border-primary rounded-[20px] min-h-[600px]">
        <div className="max-[355px] mx-auto">
          <img
            src={systemConfig?.tenantConfig.banner}
            alt="interior"
            className="w-full object-contain block rounded-xl"
          />
        </div>
        <div className="flex justify-between items-center mt-5">
          <SubHeading title={systemConfig?.tenantConfig.name ?? ""} />
        </div>

        <p className="block text-txt-color text-[12px] font-semibold leading-normal">
          {systemConfig?.tenantConfig.shopAddress ?? ""}
        </p>

        <div>
          {!_.isEmpty( appointmentTime) && dayjs(appointmentTime) && (
            <div className="my-5">
              <div className="flex items-center">
                <CalendarIcon />
                <span className="block text-txt-color text-[12px] mx-4 font-semibold leading-normal">
                  {dayjs(appointmentTime).format("dddd, DD MMM")}
                </span>
              </div>
              <div className="flex items-center mt-3">
                <Clock5Icon />
                <span className="block text-txt-color text-[12px] mx-4 font-semibold leading-normal">
                  {dayjs(appointmentTime).format("hh:mm A")}
                </span>
              </div>
            </div>
          ) }
        </div>


        {customers?.map((customer, j) => (
          <div key={j} className="mt-3">
            {j > 0 && <hr />}
            <h1 className="mt-4"> {customer}</h1>
            {bookings
              .filter((x) => x.customer == customer)
              .map((b:GroupBooking, i) => (
                <div className="flex my-[10px] justify-between" key={i}>
                  <div className="py-[10px]">
                    <span className="block text-heading-color text-[12px] font-semibold leading-normal">
                      {b.service.name}
                    </span>
                    <span className="block text-txt-color text-[12px] font-semibold leading-normal">
                      {b.barber ? `${b.barber.service_time} mins with` : ""}{" "}
                      {b.barber
                        ? b.barber.store_employee.name
                        : "Any Professional"}{" "}
                    </span>
                  </div>

                  <div className="py-[10px]">
                    <span className="block text-heading-color text-[12px] font-semibold leading-normal">
                      {CURRENCY_SYMBOL} {b.service.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ))}

        <div className="flex mt-[30px] py-[15px] justify-between border-t-2 border-primary">
          <div className="py-[10px]">
            <span className="block text-heading-color text-[16px] font-bold leading-normal">
              Total
            </span>
          </div>

          <div className="py-[10px]">
            <span className="block text-heading-color text-[16px] font-bold leading-normal">
              {" "}
              {CURRENCY_SYMBOL}{" "}
              {bookings.reduce(
                (total: number, next: GroupBooking) =>
                  total + _.toNumber(next.service.price),
                0
              )}{" "}
            </span>
          </div>
        </div>

        <div className="flex mt-[30px] py-[15px] justify-between">
          <button
            onClick={() => continueAction("")}
            className="w-full rounded-[10px] bg-primary text-white text-[16px] font-semibold leading-normal"
          >
            Continue
            {/* {modalOpen && <PaymentModal />} */}
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(GroupBookingRightSideBar);
