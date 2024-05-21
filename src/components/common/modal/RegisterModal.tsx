import assets from "@/assets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import { useAppSelector } from "@/redux/redux-hooks";
import { OTPPayload, SignUpPayload } from "@/types/auth.types";
import { setSignUpData } from "@/utils/constant";
import Loader from "../Loader";
import promiseHandler from "@/utils/promise-handler";
import { useToast } from "@/components/ui/use-toast";
import OtpVerificationModal from "./OtpVerificationModal";

interface LoginModalProps {
  openModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email").nonempty("Email is required"),
  phone: z.string().nonempty("Phone number is required"),
  postalCode: z.string( { required_error: 'Postal number is required' }),
  password: z.string().min(8, "Password must be at least 8 characters").nonempty("Password is required"),
});

type FormData = z.infer<typeof schema>;

const RegisterModal: React.FC<LoginModalProps> = ({ openModal, closeModal }) => {
  const [isLoader, setIsLoader] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const [ openOtpModal, setOtpModal ] = useState<boolean>(false);
  const { systemConfig} = useAppSelector(x =>x.appState);

  const toggleModal = (val: boolean) => {
    closeModal(val);
  };

  const getOtpCode = async (data: OTPPayload) => {
    setIsLoader(true);
    const [getOPTResult, getOPTError] = await promiseHandler(axiosInstance.post(`/app/app-user/get-otp/${systemConfig?.tenant}`, data));
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
    setOtpModal(true)
  }

  const onSubmit = async (data: FormData) => {
    setSignUpData(data as SignUpPayload);
    console.log(data);
    if (systemConfig?.tenant) {
       await getOtpCode( {email: data.email });
    }
    // handle form submission
  };

  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      {isLoader && <Loader />}
      
      <Dialog open={openModal} onOpenChange={toggleModal}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[30px]">
          <DialogHeader>
            <DialogTitle className="text-center w-full mt-[15px]">
              <img src={assets.images.greenLogo} alt="logo" className="mx-auto" />
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white px-1 pt-6 pb-8 mb-4">
              <div className="flex justify-between items-center mb-2 max-md:flex-col">
                <div className="pr-1 max-md:pr-0 max-md:w-full max-md:mb-2">
                  <label className="block text-txt-color text-[12px] font-semibold mb-1" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName?.message}</p>}
                </div>
                <div className="pl-1 max-md:pl-0 max-md:w-full">
                  <label className="block text-txt-color text-[12px] font-semibold mb-1" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName?.message}</p>}
                </div>
              </div>
              <p className="my-[10px] text-[10px] text-txt-color leading-normal font-semibold">Make sure it matches your ID name</p>
              <div className="mb-1">
                <label className="block text-txt-color text-[12px] font-semibold mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email..."
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email?.message}</p>}
              </div>
              <div className="mb-1">
                <label className="block text-txt-color text-[12px] font-semibold mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none"
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
                {errors.phone && <p className="text-red-500 text-xs">{errors.phone?.message}</p>}
              </div>
              <div className="mb-1">
                <label className="block text-txt-color text-[12px] font-semibold mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none"
                  id="password"
                  type="password"
                  placeholder="******************"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
              </div>
              <div className="mb-1">
                <label className="block text-txt-color text-[12px] font-semibold mb-1" htmlFor="email">
                  Postal Code
                </label>
                <input
                  className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none"
                  id="postalCode"
                  type="number"
                  placeholder="Enter Postal Code..."
                  {...register("postalCode")}
                />
                {errors.postalCode && <p className="text-red-500 text-xs">{errors.postalCode?.message}</p>}
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="w-full text-center bg-primary text-white font-bold py-3 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
              <div className="my-[15px] text-center flex justify-center">
                <span className="text-heading-color text-[12px] font-bold leading-normal block mr-1">Do you have already an Account? </span>
                <a href="#" className="text-primary text-[12px] font-semibold">Sign in</a>
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
