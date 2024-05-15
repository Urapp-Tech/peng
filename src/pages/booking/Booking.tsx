import Header from "@/components/common/header/Header";
import LoginModal from "@/components/common/modal/LoginModal";
import MainTabs from "@/components/common/tabs/MainTabs";
import RightSideBar from "@/components/layouts/RightSideBar";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/redux-hooks";
import _ from "lodash";
import { memo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { user } = useAppSelector( x => x.authState)


  const steps = [
      {
        step: 1,
        title: "Services",
        path: "/booking/appointment/services",
        auth: false,
      },
      {
        step: 2,
        title: "Professionals",
        path: "/booking/appointment/professionals",
        auth: false,

      },
      {
        step: 3,
        title: "Time",
        path: "/booking/appointment/time",
        auth: false,
      },
      {
        step: 4,
        title: "Confirmation",
        path: "/booking/appointment/confirmation",
        auth: true,
      },
  
  ];

  const handleClick = (path:string) => {
    if( _.isEmpty(path) ) {
        path = pathname;
    }
    // Perform navigation and open modal
    const step  = steps.find(x => x.path.includes(path));
    if(step) {
        const nextStep = path !== pathname ? step : steps.find(x =>x.step === step.step + 1);
        if(nextStep && !nextStep.auth) {
            navigate(nextStep.path);
        }
        else if (nextStep && nextStep.auth) {
            if(user && user.id) {
                navigate(nextStep.path);
            }
            else {
                setShowLogin(true);
            }
        }
        else {
            navigate("/booking/appointment/services");
        }
    }
  };

  const isActive = (path: string) => {
    if (pathname.includes(path)) {
      return "active";
    }
    return "inactive";
  };

  return (
    <>
      <div className="w-full h-full">
        <div
          className="w-full 
                flex h-full justify-between max-w-[1200px] mx-auto px-[20px] py-[40px]"
        >
          <div className=" w-[65%] main-tabs px-[20px]">
            {/* <MainTabs /> */}
            <div className="gap-4 ">
              <Button
                onClick={() => handleClick("/booking/appointment/services")}
                variant="link"
                className={`mr-3 ${isActive("booking/appointment/services")}`}
              >
                {" "}
                Services
              </Button>
              <Button
                onClick={() => handleClick("/booking/appointment/professionals")}
                variant="link"
                className={`mx-3 ${isActive(
                  "booking/appointment/professionals"
                )}`}
              >
                {" "}
                Professional
              </Button>
              <Button
                onClick={() => handleClick("/booking/appointment/time")}
                variant="link"
                className={`mx-3 ${isActive("booking/appointment/time")}`}
              >
                {" "}
                Time
              </Button>
              <Button
                onClick={() => handleClick("/booking/appointment/confirm")}
                variant="link"
                className={`mx-3 ${isActive("booking/appointment/confirm")}`}
              >
                {" "}
                Confirm
              </Button>
            </div>
            <Outlet />
          </div>
          <div className="w-[35%]">
            <RightSideBar continueAction={handleClick} />
          </div>
        </div>
      </div>
      <LoginModal openModal={showLogin} closeModal={setShowLogin} />
    </>
  );
};

export default memo(Booking);
