import axiosInstance from '@/api/axiosInstance';
import assets from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { login } from '@/redux/features/authStateSlice';
import { useAppDispatch } from '@/redux/redux-hooks';
import { getTenantId } from '@/utils/constant';
import { getItem } from '@/utils/local-storage';
import promiseHandler from '@/utils/promise-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import OTPInput from 'react18-otp-input';
import { z } from 'zod';
import Loader from '../Loader';

interface LoginModalProps {
  openModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const otpSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
});

type OtpFormData = z.infer<typeof otpSchema>;

const OtpVerificationModal: React.FC<LoginModalProps> = ({
  openModal,
  closeModal,
}) => {
  const signUpData = getItem<any>('SIGN_UP_DATA');
  const [isLoader, setIsLoader] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const toggleModal = (val: boolean) => {
    closeModal(val);
  };

  const onSubmit = async (data: OtpFormData) => {
    setIsLoader(true);

    const code = Object.assign(signUpData, {
      otp: data.otp,
      tenant: getTenantId(),
      createdDate: dayjs().format(),
      updatedDate: dayjs().format(),
    });

    const [signUpResult, signUpError] = await promiseHandler(
      axiosInstance.post(`/app/app-user/sign-up/app`, code)
    );

    setIsLoader(false);

    if (!signUpResult) {
      console.error('error :>> ', signUpError.message);
      return;
    }
    if (!signUpResult.data.success) {
      console.error('error :>> ', signUpResult.data.message);
      return;
    }

    dispatch(login(signUpResult.data.data));

    // Here you would handle OTP verification
    toggleModal(false); // Close OTP modal after successful verification
  };

  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      {isLoader && <Loader />}
      <Dialog open={openModal} onOpenChange={toggleModal}>
        <DialogContent className="rounded-[30px] bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mt-[15px] w-full text-center">
              <img
                src={assets.images.greenLogo}
                alt="logo"
                className="mx-auto"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-4 bg-white px-1 pb-8 pt-6"
            >
              <div className="mb-1">
                <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                  A 4 digit code has been sent to
                </span>
                <span className="block text-center text-[14px] font-medium leading-[normal] text-[#6A6A6A]">
                  {signUpData?.email ?? ''}
                </span>
                <div className="my-5 flex justify-center">
                  <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <OTPInput
                        placeholder="1234"
                        className="mx-2"
                        containerStyle="otp-container"
                        inputStyle={{
                          width: '3rem',
                          aspectRatio: '1/1',
                          borderRadius: '0.625rem',
                          outlineStyle: 'solid',
                          outlineWidth: '1px',
                          outlineColor: '#E5E5E5',
                          fontFamily: 'Open Sans',
                          fontSize: '1.25rem',
                          lineHeight: '1.5rem',
                          fontWeight: 600,
                          color: '#000000',
                        }}
                        focusStyle={{ outlineColor: '#000000' }}
                        numInputs={4}
                        onChange={field.onChange}
                        separator={<span> </span>}
                        isInputNum
                        shouldAutoFocus
                        value={field.value}
                      />
                    )}
                  />
                </div>
                {errors.otp && (
                  <p className="my-5 text-center text-xs text-red-500">
                    {errors.otp?.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-3 text-center text-[12px] font-bold text-white focus:outline-none"
                  type="submit"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OtpVerificationModal;
