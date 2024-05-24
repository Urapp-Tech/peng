import axiosInstance from '@/api/axiosInstance';
import assets from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  setOtpEmail,
  showForgotOtpModal,
} from '@/redux/features/forgotPasswordSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import promiseHandler from '@/utils/promise-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'email is required' })
    .email('email is invalid'),
});

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;

const formOptions = { resolver: zodResolver(forgotPasswordSchema) };

interface ForgotPasswordModalProps {
  openModal: boolean;
  closeModal: (val: boolean) => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  openModal,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>(formOptions);
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [, setIsLoader] = useState(false);
  const { systemConfig } = useAppSelector((x) => x.appState);

  const toggleModal = (val: boolean) => {
    closeModal(val);
  };

  const onSubmit: SubmitHandler<ForgotPasswordType> = async (data) => {
    if (!systemConfig?.tenant) {
      return;
    }
    // Handle form submission
    setIsLoader(true);

    const [forgotPasswordResult, forgotPasswordError] = await promiseHandler(
      axiosInstance.post('/app/app-user/forgotPassword/app', {
        email: data.email,
        tenant: systemConfig?.tenant,
      })
    );
    setIsLoader(false);

    if (!forgotPasswordResult) {
      toast({
        title: 'Error while signing in',
        variant: 'destructive',
        description: forgotPasswordError.message,
      });
      return;
    }
    if (!forgotPasswordResult.data.success) {
      toast({
        title: 'Error while signing in',
        variant: 'destructive',
        description: forgotPasswordResult.data.message,
      });
      return;
    }
    dispatch(setOtpEmail(data.email));
    dispatch(showForgotOtpModal());
    toggleModal(false);
  };

  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      <Dialog open={openModal} onOpenChange={toggleModal}>
        <DialogContent className="h-[90%] rounded-[30px] bg-white max-md:w-[400px] max-[480px]:w-[300px]">
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
              className="mb-4 h-full bg-white px-1 pb-8 pt-6 max-[480px]:py-1"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <label
                  className="mb-2 block text-[12px] font-semibold text-txt-color"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
                  type="submit"
                >
                  Get Code
                </button>
              </div>
              {/* <div className="relative brk-points flex justify-between items-center my-[20px] opacity-[0.5]">
                <span className="w-[45%] bg-primary h-[1px] block"></span>
                <span className="block text-txt-color w-[10%] text-center">
                  or
                </span>
                <span className="w-[45%] bg-primary h-[1px] block"></span>
              </div> */}
              {/* <div className="my-[15px] text-center flex justify-center">
                <span className="text-heading-color text-[12px] font-bold leading-normal block mr-1">
                  Are you new?{" "}
                </span>
                <div
                  className="text-primary text-[12px] font-semibold cursor-pointer"
                  onClick={() => {
                    closeModal(false);
                    openRegisterModal(true);
                  }}
                >
                  Create an Account
                </div>
              </div> */}
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForgotPasswordModal;
