import assets from '@/assets';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MainScreen = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(search);
    const code = params.get('err_code');
    const msg = params.get('err_msg');
    if (search && params && code) {
      if (code === '000') {
        toast({
          title: 'Payment Success!',
          variant: 'default',
          description: 'Booking & payment successfully completed',
        });
      } else {
        toast({
          title: 'Error!',
          variant: 'destructive',
          description: msg,
        });
      }
    }
  }, []);

  return (
    <div className="main-sel-scr h-screen w-full ">
      <div className="relative mx-auto p-[30px]">
        <div className="absolute left-[100px] top-[40px] z-[11] h-[32px] w-[83px]">
          <img
            src={assets.images.logo}
            alt="logo"
            className="h-auto w-full object-contain"
          />
        </div>
      </div>

      <div className="flex items-center justify-center pt-[10%]">
        <div className="mx-auto mb-[30px] max-w-[400px] flex-1 text-center">
          <h1 className="mb-[10px] text-[40px] font-normal capitalize text-white ">
            Choose an option
          </h1>
          <div className="py-[20px]">
            <button
              onClick={() => navigate('/booking/appointment')}
              className=" w-full flex-col items-start rounded-[10px] bg-white px-[25px] py-[28px] text-[16px] font-bold leading-normal text-heading-color"
            >
              Book an Appointment
              <span className="mt-[5px] block text-[10px] font-semibold leading-normal text-txt-color">
                Schedule service for yourself
              </span>
            </button>
          </div>
          <div className="py-[20px]">
            <button
              onClick={() => navigate('/booking/group-appointment')}
              className="w-full flex-col items-start rounded-[10px] bg-white px-[25px] py-[28px] text-[16px] font-bold leading-normal text-heading-color"
            >
              Group Appointment
              <span className="mt-[5px] block text-center text-[10px] font-semibold leading-normal text-txt-color">
                For yourself & others
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
