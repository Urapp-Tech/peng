/* eslint-disable jsx-a11y/anchor-is-valid */
import assets from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import axiosInstance from '@/api/axiosInstance';
import { useToast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/redux/redux-hooks';
import { OTPPayload, SignUpPayload } from '@/types/auth.types';
import { setSignUpData } from '@/utils/constant';
import promiseHandler from '@/utils/promise-handler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Loader from '../Loader';
import OtpVerificationModal from './OtpVerificationModal';

interface LoginModalProps {
  openModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = z.object({
  firstName: z.string().nonempty('First name is required'),
  lastName: z.string().nonempty('Last name is required'),
  email: z.string().email('Invalid email').nonempty('Email is required'),
  phone: z.string().nonempty('Phone number is required'),
  postalCode: z.string({ required_error: 'Postal number is required' }),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .nonempty('Password is required'),
});

type FormData = z.infer<typeof schema>;

const RegisterModal: React.FC<LoginModalProps> = ({
  openModal,
  closeModal,
}) => {
  const [isLoader, setIsLoader] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const [openOtpModal, setOtpModal] = useState<boolean>(false);
  const { systemConfig } = useAppSelector((x) => x.appState);

  const toggleModal = (val: boolean) => {
    closeModal(val);
  };

  const getOtpCode = async (data: OTPPayload) => {
    setIsLoader(true);
    const [getOPTResult, getOPTError] = await promiseHandler(
      axiosInstance.post(`/app/app-user/get-otp/${systemConfig?.tenant}`, data)
    );
    if (!getOPTResult) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: getOPTError.message,
      });
      setIsLoader(false);
      return;
    }
    if (!getOPTResult.data.success) {
      setIsLoader(false);
      toast({
        title: 'Error',
        variant: 'destructive',
        description: getOPTResult.data.message,
      });
      return;
    }
    setIsLoader(false);
    closeModal(false);
    setOtpModal(true);
  };

  const onSubmit = async (data: FormData) => {
    setSignUpData(data as SignUpPayload);
    console.log(data);
    if (systemConfig?.tenant) {
      await getOtpCode({ email: data.email });
    }
    // handle form submission
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
              <div className="mb-2 flex items-center justify-between max-md:flex-col">
                <div className="pr-1 max-md:mb-2 max-md:w-full max-md:pr-0">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">
                      {errors.firstName?.message}
                    </p>
                  )}
                </div>
                <div className="pl-1 max-md:w-full max-md:pl-0">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">
                      {errors.lastName?.message}
                    </p>
                  )}
                </div>
              </div>
              <p className="my-[10px] text-[10px] font-semibold leading-normal text-txt-color">
                Make sure it matches your ID name
              </p>
              <div className="mb-1">
                <label
                  className="mb-1 block text-[12px] font-semibold text-txt-color"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="mb-3 w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email..."
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  className="mb-1 block text-[12px] font-semibold text-txt-color"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="mb-3 w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">
                    {errors.phone?.message}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  className="mb-1 block text-[12px] font-semibold text-txt-color"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="mb-3 w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-1">
                <label
                  className="mb-1 block text-[12px] font-semibold text-txt-color"
                  htmlFor="email"
                >
                  Postal Code
                </label>
                <input
                  className="mb-3 w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                  id="postalCode"
                  type="number"
                  placeholder="Enter Postal Code..."
                  {...register('postalCode')}
                />
                {errors.postalCode && (
                  <p className="text-xs text-red-500">
                    {errors.postalCode?.message}
                  </p>
                )}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-3 text-center text-[12px] font-bold text-white focus:outline-none"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              <div className="my-[15px] flex justify-center text-center">
                <span className="mr-1 block text-[12px] font-bold leading-normal text-heading-color">
                  Do you have already an Account?
                </span>
                <a href="#" className="text-[12px] font-semibold text-primary">
                  Sign in
                </a>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <OtpVerificationModal openModal={openOtpModal} closeModal={setOtpModal} />
    </div>
  );
};

export default RegisterModal;
