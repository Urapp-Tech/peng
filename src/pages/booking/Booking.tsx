import axiosInstance from '@/api/axiosInstance';
import Loader from '@/components/common/Loader';
import ForgotPasswordModal from '@/components/common/modal/ForgotPasswordModal';
import ForgotPasswordOtpVerificationModal from '@/components/common/modal/ForgotPasswordOtpVerificationModal';
import LoginModal from '@/components/common/modal/LoginModal';
import MsgModal from '@/components/common/modal/MsgModal';
import RegisterModal from '@/components/common/modal/RegisterModal';
import RightSideBar from '@/components/layouts/RightSideBar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { clearBookings } from '@/redux/features/bookingSlice';
import {
  handleShowForgotModal,
  handleShowForgotOtpModal,
} from '@/redux/features/forgotPasswordSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import promiseHandler from '@/utils/promise-handler';
import dayjs from 'dayjs';
import utcPlugin from 'dayjs/plugin/utc';
import _ from 'lodash';
import { memo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import PayFastForm from './PayFastForm';
import PaymentMethodModal from '@/components/common/modal/PaymentMethodModal';
import {
  handleShowGuestLoginModal,
  handleShowLoginModal,
} from '@/redux/features/authModalSlice';
import GuestLoginModal from '@/components/common/modal/GuestLoginModal';

dayjs.extend(utcPlugin);

const Booking = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showMsg, setShowMsg] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [_paymentMethod, _setPaymentMethod] = useState<string>('Cash');
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const { user, guest } = useAppSelector((x) => x.authState);
  const [, setFirstVisit] = useState<string>('No');
  const [loading, setLoading] = useState<boolean>(false);
  const [payFastFormData, setPayFastFormData] = useState<any>(null);
  const { bookings, appointmentTime } = useAppSelector((x) => x.bookingState);
  const { systemConfig } = useAppSelector((x) => x.appState);
  const formSubmitButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { forgotModal, forgotOtpModal, forgotOtpEmail } = useAppSelector(
    (x) => x.forgotPasswordState
  );
  const { loginModal, GuestLoginModal: showGuestLoginModal } = useAppSelector(
    (x) => x.authModalState
  );

  const showMsgModal = () => {
    setShowMsg(true);
  };

  const getUser = ():
    | {
        phone: string;
        name?: string;
        email?: string;
      }
    | null
    | undefined => {
    if (user && user.id) {
      return { ...user, name: `${user.firstName} ${user.lastName}` };
    }
    if (guest && !_.isEmpty(guest.name)) {
      return guest;
    }
    return null;
  };

  /** LOGIN MODAL */
  const handleLoginModal = (val: boolean = true) => {
    dispatch(handleShowLoginModal(val));
  };

  /** GUEST LOGIN MODAL */
  const handleGuestLoginModal = (val: boolean = true) => {
    dispatch(handleShowGuestLoginModal(val));
  };

  const handleShowPasswordModalState = (val: boolean) => {
    dispatch(handleShowForgotModal(val));
  };
  const handleShowPasswordModalOtpState = (val: boolean) => {
    dispatch(handleShowForgotOtpModal(val));
  };

  const selectProfessional = () => {
    if (bookings.length === 0) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: 'Please select service before selecting professional.',
      });
      return;
    }
    navigate('/booking/appointment/professionals');
  };
  const selectTime = () => {
    if (bookings.length === 0) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description:
          'Please select service & professional before selecting Time.',
      });
      return;
    }
    navigate('/booking/appointment/time');
  };

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
        if (getUser()) {
          if (nextStep.isFunction) {
            nextStep.callback();
          } else {
            navigate(nextStep.path);
          }
        } else {
          handleLoginModal(true);
        }
      } else {
        navigate('/booking/appointment/services');
      }
    }
  };

  const visitConfirmation = (val: string) => {
    setFirstVisit(val);
    setShowMsg(false);
    setShowPaymentModal(true);
  };

  const PaymentMethodConfirmation = (val: string) => {
    _setPaymentMethod(val);
    setShowPaymentModal(false);
    submitBooking(val);
  };

  const paymentByPayFast = async (code: string, grandTotal: string) => {
    const payFastTokenPromise = axiosInstance.post(
      `app/appointment/pay-fast/access-token`
    );
    const [payFastTokenResult, payFastTokenError] =
      await promiseHandler(payFastTokenPromise);
    if (!payFastTokenResult) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: payFastTokenError.message,
      });
      return;
    }
    if (!payFastTokenResult.data.success) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: payFastTokenResult?.data?.message,
      });
      return;
    }
    setPayFastFormData({
      merchantId: payFastTokenResult.data.data.merchantId,
      token: payFastTokenResult.data.data.accessToken,
      merchantName: payFastTokenResult.data.data.name,
      generatedDateTime: payFastTokenResult.data.data.generatedDateTime,
      // successURL: payFastTokenResult.data.data.successUrl,
      successURL: window.location.origin,
      failureURL: window.location.origin,
      webHookURL: payFastTokenResult.data.data.payFastHookUrl,
      userName: getUser()?.name,
      totalPrice: grandTotal,
      phoneNumber: getUser()?.phone,
      emailAddress: getUser()?.email,
      orderId: code,
      currencyType: import.meta.env.VITE_CURRENCY_SYMBOL,
    });
    setTimeout(() => {
      formSubmitButtonRef?.current?.click();
    }, 0);
  };

  const submitBooking = async (_pm: string = 'Cash') => {
    if (bookings.length === 0) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: 'No services is selected.',
      });
      return;
    }

    if (_.isUndefined(appointmentTime) || !dayjs(appointmentTime).isValid()) {
      toast({
        title: 'Error!',
        variant: 'destructive',
        description: 'Please select time slot before continuing.',
      });
      return;
    }

    const appointments = bookings.map((booking) => {
      return {
        appointmentTime: dayjs(appointmentTime)
          .utc()
          .format('YYYY-MM-DD HH:mm:ss'),
        storeEmployee: booking.barber?.store_employee.id || '',
        storeServiceCategory: booking.service.storeServiceCategory,
        storeServiceCategoryItem: booking.service.id,
        appointmentType: booking.barber ? 'Professional' : 'AnyProfessional',
      };
    });

    const data = {
      name: getUser()?.name,
      phone: getUser()?.phone,
      email: getUser()?.email,
      status: 'New',
      note: '',
      appointments,
    };

    let p: object = {
      tenant: systemConfig?.tenant,
    };
    if (user?.id) {
      p = {
        tenant: systemConfig?.tenant,
        app_user: user?.id,
      };
    }

    setShowMsg(false);
    setLoading(true);
    await axiosInstance
      .post(`/app/store/appointment/peng/create`, data, {
        params: p,
      })
      .then((res: any) => {
        if (res.data.success) {
          setLoading(false);

          toast({
            title: 'Success!',
            variant: 'default',
            description: res.data.message,
          });

          dispatch(clearBookings());

          if (_paymentMethod !== 'Cash') {
            if (
              !_.isEmpty(res.data.data[0][0]) &&
              _.isObject(res.data.data[0][0])
            ) {
              paymentByPayFast(
                (res.data.data[0][0] as any).code,
                (res.data.data[0][0] as any).grandTotalAmount
              );
            }
          } else {
            setTimeout(() => {
              handleClick('/booking/appointment/services');
            }, 500);
          }
        } else {
          toast({
            title: 'Error!',
            variant: 'destructive',
            description: res.data.message,
          });
          setLoading(false);
        }
      })
      .catch((err: any) => {
        setLoading(false);

        toast({
          title: 'Error!',
          variant: 'destructive',
          description: err.message,
        });
      });
  };

  const steps = [
    {
      step: 1,
      title: 'Services',
      isFunction: false,
      path: '/booking/appointment/services',
      auth: false,
      callback: () => {},
    },
    {
      step: 2,
      title: 'Professionals',
      isFunction: true,
      path: '/booking/appointment/professionals',
      auth: false,
      callback: selectProfessional,
    },
    {
      step: 2,
      title: 'Professionals',
      isFunction: false,
      path: '/booking/appointment/professionals-by-service',
      auth: false,
      callback: () => {},
    },
    {
      step: 3,
      title: 'Time',
      isFunction: true,
      path: '/booking/appointment/time',
      auth: false,
      callback: selectTime,
    },
    {
      step: 4,
      title: 'Confirmation',
      isFunction: true,
      path: 'ConfirmationFunction',
      auth: true,
      callback: showMsgModal,
    },
    {
      step: 5,
      title: 'Submit',
      isFunction: true,
      path: 'SubmitFunction',
      auth: true,
      callback: submitBooking,
    },
  ];

  const isActive = (path: string) => {
    if (pathname.includes(path)) {
      return 'active';
    }
    return 'inactive';
  };

  return (
    <>
      <div className="h-full w-full">
        {loading && <Loader />}
        <div
          className="mx-auto 
                flex h-full w-full max-w-[1200px] justify-between px-[20px] py-[40px] max-lg:flex-col"
        >
          <div className=" main-tabs w-[65%] px-[20px] max-lg:mb-2 max-lg:w-full ">
            <div className="m--tabs max-sm:overflow-y-hidden max-sm:overflow-x-scroll max-sm:pb-4">
              <div className="gap-4 max-sm:mx-auto max-sm:w-[600px]">
                <Button
                  onClick={() => handleClick('/booking/appointment/services')}
                  variant="link"
                  className={`mr-3 ${isActive('booking/appointment/services')}`}
                >
                  {' '}
                  Services
                </Button>
                <Button
                  onClick={() =>
                    handleClick('/booking/appointment/professionals')
                  }
                  variant="link"
                  className={`mx-3 ${isActive(
                    'booking/appointment/professionals'
                  )}`}
                >
                  {' '}
                  Professional
                </Button>
                <Button
                  onClick={() => handleClick('/booking/appointment/time')}
                  variant="link"
                  className={`mx-3 ${isActive('booking/appointment/time')}`}
                >
                  {' '}
                  Time
                </Button>
                <Button
                  onClick={() => handleClick('/booking/appointment/confirm')}
                  variant="link"
                  className={`mx-3 ${isActive('booking/appointment/confirm')}`}
                >
                  {' '}
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
        openModal={loginModal}
        closeModal={handleLoginModal}
        openRegisterModal={setShowRegister}
      />
      <GuestLoginModal
        openModal={showGuestLoginModal}
        closeModal={handleGuestLoginModal}
      />
      <RegisterModal openModal={showRegister} closeModal={setShowRegister} />
      <MsgModal
        openModal={showMsg}
        closeModal={setShowMsg}
        handleClick={visitConfirmation}
      />
      <PaymentMethodModal
        openModal={showPaymentModal}
        closeModal={setShowPaymentModal}
        handleClick={PaymentMethodConfirmation}
      />
      <ForgotPasswordModal
        openModal={forgotModal}
        closeModal={handleShowPasswordModalState}
      />
      <ForgotPasswordOtpVerificationModal
        openModal={forgotOtpModal}
        email={forgotOtpEmail}
        closeModal={handleShowPasswordModalOtpState}
      />

      {payFastFormData ? (
        <PayFastForm
          token={payFastFormData.token}
          totalPrice={payFastFormData.totalPrice}
          phoneNumber={payFastFormData.phoneNumber}
          emailAddress={payFastFormData.emailAddress}
          items={payFastFormData.items}
          successURL={payFastFormData.successURL}
          failureURL={payFastFormData.failureURL}
          webHookURL={payFastFormData.webHookURL}
          orderId={payFastFormData.orderId}
          currencyType={payFastFormData.currencyType}
          userName={payFastFormData.userName}
          merchantId={payFastFormData.merchantId}
          merchantName={payFastFormData.merchantName}
          generatedDateTime={payFastFormData.generatedDateTime}
          formSubmitButtonRef={formSubmitButtonRef}
        />
      ) : null}
    </>
  );
};

export default memo(Booking);
