import MainTabs from "@/components/common/tabs/MainTabs";
import RightSideBar from "@/components/layouts/RightSideBar";

const GroupAppointmentPage = () => {
  return (
    <div className="w-full h-full">
      <div className="w-full flex h-full justify-between max-w-[1200px] mx-auto px-[20px] py-[40px]">
        <div className=" w-[65%] main-tabs px-[20px]">
          <MainTabs />
        </div>
        <div className="w-[35%]">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default GroupAppointmentPage;
