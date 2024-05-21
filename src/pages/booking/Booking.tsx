import Loader from "@/components/common/Loader";
import LoginModal from "@/components/common/modal/LoginModal";
import MsgModal from "@/components/common/modal/MsgModal";
import RegisterModal from "@/components/common/modal/RegisterModal";
import RightSideBar from "@/components/layouts/RightSideBar";
import { Button } from "@/components/ui/button";
import utcPlugin from 'dayjs/plugin/utc';
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import dayjs from "dayjs";
import _ from "lodash";
import { memo, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/components/ui/use-toast";
import { clearBookings } from "@/redux/features/bookingSlice";

dayjs.extend(utcPlugin);


const Booking = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  const { user } = useAppSelector((x) => x.authState);
  const [ _firstVisit , setFirstVisit] = useState<string>('No');
  const [ loading , setLoading] = useState<boolean>(false);
  const { bookings, appointmentTime } = useAppSelector((x) => x.bookingState);
  const { systemConfig } = useAppSelector((x) => x.appState);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const showMsgModal = () => {
    setShowMsg(true);
  }

  const visitConfirmation = (val: string) => {
    setFirstVisit(val);
    handleClick('SubmitFunction')
  }

  
  const submitBooking = async () => {

    if(bookings.length == 0) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: 'No services is selected.',
      })
      return;
    }

    if(_.isUndefined(appointmentTime) || !dayjs(appointmentTime).isValid()) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: 'Please select time slot before continuing.',
      })
      return;
    }

    const appointments =  bookings.map((booking )=>{
      return {
        appointmentTime: dayjs( appointmentTime).utc().format('YYYY-MM-DD HH:mm:ss'),
        storeEmployee: booking.barber?.store_employee.id || '',
        storeServiceCategory: booking.service.storeServiceCategory,
        storeServiceCategoryItem: booking.service.id,
        appointmentType: booking.barber ? 'Professional' : 'AnyProfessional',
      }
    });

    const data = {
      name: user?.firstName + ' ' + user?.lastName, 
      phone: user?.phone,
      email: user?.email,
      status: 'New',
      note: '',
      appointments,
    }

    setShowMsg(false);


    await axiosInstance.post(`/app/store/appointment/create`,data, { params: { tenant: systemConfig?.tenant, app_user: user?.id } })
    .then((res: any) => {
      if (res.data.success) {
        setLoading(false);

        toast({
          title: 'Success!',
          variant: 'default',
          description: res.data.message,
        })

        dispatch(clearBookings())
        setTimeout(() => {
          handleClick("/booking/appointment/services")
        }, 500);
      } else {
        toast({
          title: 'Error!',
          variant: 'destructive',
          description: res.data.message,
        })
        setLoading(false);
        
      }
    })
    .catch((err: any) => {
      setLoading(false);

      toast({
        title: 'Error!',
        variant: 'destructive',
        description: err.message,
      })
    });
  }

  const steps = [
    {
      step: 1,
      title: "Services",
      isFunction: false,
      path: "/booking/appointment/services",
      auth: false,
      callback: () => {},
    },
    {
      step: 2,
      title: "Professionals",
      isFunction: false,
      path: "/booking/appointment/professionals",
      auth: false,
      callback: () => {},
    },
    {
      step: 2,
      title: "Professionals",
      isFunction: false,
      path: "/booking/appointment/professionals-by-service",
      auth: false,
      callback: () => {},
    },
    {
      step: 3,
      title: "Time",
      isFunction: false,
      path: "/booking/appointment/time",
      auth: false,
      callback: () => {},
    },
    {
      step: 4,
      title: "Confirmation",
      isFunction: true,
      path: "ConfirmationFunction",
      auth: true,
      callback: showMsgModal,
    },
    {
      step: 5,
      title: "Submit",
      isFunction: true,
      path: "SubmitFunction",
      auth: true,
      callback: submitBooking,
    },
  ];


  const handleClick = (path: string) => {
    if (_.isEmpty(path)) {
      path = pathname;
    }
    // Perform navigation and open modal
    const step = steps.find((x) => x.path.includes(path));
    if (step) {
      const nextStep =
        path !== pathname ? step : steps.find((x) => x.step === step.step + 1);
      if (nextStep && !nextStep.auth) {
        if (nextStep.isFunction) {
          nextStep.callback();
        } else {
          navigate(nextStep.path);
        }
      } else if (nextStep && nextStep.auth) {
        if (user && user.id) {
          if (nextStep.isFunction) {
            nextStep.callback();
          } else {
            navigate(nextStep.path);
          }
        } else {
          setShowLogin(true);
        }
      } else {
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
      { loading &&  <Loader /> }
        <div
          className="w-full 
                flex h-full justify-between max-w-[1200px] mx-auto px-[20px] py-[40px] max-lg:flex-col"
        >
          <div className=" w-[65%] main-tabs px-[20px] max-lg:w-full max-lg:mb-2 ">
            <div className="max-sm:overflow-x-scroll max-sm:overflow-y-hidden max-sm:pb-4 m--tabs">
              <div className="gap-4 max-sm:w-[600px] max-sm:mx-auto">
                <Button
                  onClick={() => handleClick("/booking/appointment/services")}
                  variant="link"
                  className={`mr-3 ${isActive("booking/appointment/services")}`}
                >
                  {" "}
                  Services
                </Button>
                <Button
                  onClick={() =>
                    handleClick("/booking/appointment/professionals")
                  }
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
            </div>

            <Outlet />
          </div>
          <div className="w-[35%] max-lg:w-full max-lg:px-[20px]">
            <RightSideBar continueAction={handleClick} />
          </div>
        </div>
      </div>
      <LoginModal
        openModal={showLogin}
        closeModal={setShowLogin}
        openRegisterModal={setShowRegister}
      />
      <RegisterModal openModal={showRegister} closeModal={setShowRegister} />
      <MsgModal openModal={showMsg} closeModal={setShowMsg} handleClick={visitConfirmation} />
    </>
  );
};

export default memo(Booking);
