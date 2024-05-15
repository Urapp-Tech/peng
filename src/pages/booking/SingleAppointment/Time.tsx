import assets from "@/assets";
import IconButtons from "@/components/common/buttons/IconButtons";
import ImageBtn from "@/components/common/buttons/ImageBtn";
import TimeSlotsBtn from "@/components/common/buttons/TimeSlotsBtn";
import UserDropDown from "@/components/common/dropdown/UserDropDown";
import DateSldier from "@/components/common/sliders/DateSldier";
import MainHeading from "@/components/common/typography/MainHeading";
import { useNavigate } from "react-router-dom";

const Time = () => {
  const navigate = useNavigate();
  // const handleClick = () => {
  //   // Perform navigation and open modal
  //   navigate("/booking/appointment/professional"); // Navigate to the login route
  // };

  return (
    <>
      <MainHeading title="Select Date & Time" />
      <UserDropDown />
      <div className="flex justify-between my-[15px]">
        <span className="block text-heading-color text-[16px] font-bold leading-normal capitalize">
          April 2024
        </span>
        <span className="block text-heading-color text-[16px] font-bold leading-normal capitalize">
          May 2024
        </span>
      </div>
      <DateSldier />
      <div className="shadow-md my-[15px] max-h-[400px] overflow-x-hidden overflow-y-scroll p-[15px]">
        <TimeSlotsBtn time="1:00 PM" />
        <TimeSlotsBtn time="2:00 PM" />
        <TimeSlotsBtn time="3:00 PM" />
        <TimeSlotsBtn time="4:00 PM" />
        <TimeSlotsBtn time="5:00 PM" />
        <TimeSlotsBtn time="6:00 PM" />
        <TimeSlotsBtn time="7:00 PM" />
        <TimeSlotsBtn time="8:00 PM" />
        <TimeSlotsBtn time="9:00 PM" />
        <TimeSlotsBtn time="1:00 PM" />
        <TimeSlotsBtn time="2:00 PM" />
        <TimeSlotsBtn time="3:00 PM" />
        <TimeSlotsBtn time="4:00 PM" />
        <TimeSlotsBtn time="5:00 PM" />
      </div>
    </>
  );
};

export default Time;
