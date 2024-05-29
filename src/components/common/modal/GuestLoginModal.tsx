import assets from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { loginGuest } from '@/redux/features/authStateSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { PATTERN } from '@/utils/constant';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

interface LoginFormValues {
  name: string;
  phone: string;
}

interface LoginModalProps {
  openModal: boolean;
  closeModal: (val: boolean) => void;
}

const schema = z.object({
  name: z.string().nonempty('First name is required'),
  phone: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(PATTERN.PHONE, 'Invalid phone number format'),
});

type FormData = z.infer<typeof schema>;

const GuestLoginModal: React.FC<LoginModalProps> = ({
  openModal,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const { systemConfig } = useAppSelector((x) => x.appState);

  const toggleModal = (val: boolean) => {
    closeModal(val);
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    if (!systemConfig?.tenant) {
      return;
    }

    dispatch(loginGuest({ name: data.name, phone: data.phone }));
    toast({
      title: 'Success',
      variant: 'default',
      description: 'You have successfully logged in as a guest',
    });
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
                  Name
                </label>
                <input
                  {...register('name', {
                    required: 'Username is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-xs italic text-red-500">
                    {errors.name.message}
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
              <div className="flex items-center justify-center">
                <button
                  className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GuestLoginModal;
