import axiosInstance from '@/api/axiosInstance';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { INVALID_CHAR, MAX_LENGTH_EXCEEDED, PATTERN } from '@/utils/constant';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import OTPInput from 'react18-otp-input';
import assets from '../../../assets';
import { useAppSelector } from '../../../redux/redux-hooks';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

type Pass = {
  newPassword: string;
  reNewPassword: string;
};

interface LoginModalProps {
  openModal: boolean;
  email?: string;
  closeModal: (val: boolean) => void;
}

const ForgotPasswordOtpVerificationModal: React.FC<LoginModalProps> = ({
  openModal,
  email,
  closeModal,
}) => {
  const [OTP, setOTP] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const { systemConfig } = useAppSelector((state) => state.appState);

  const [showRegister, setShowRegister] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Pass>();

  const toggleModal = (val: boolean) => {
    closeModal(val);
  };

  const submitHandler = (data: Pass) => {
    setIsLoader(true);
    const newPassObj = {
      password: data.newPassword,
      email,
      otp: OTP,
      tenant: systemConfig?.tenant,
    };
    axiosInstance
      .post(`app/app-user/resetPassword/app`, newPassObj)
      .then((res: any) => {
        if (res.data.success) {
          setIsLoader(false);
          setTimeout(() => {
            toast({
              title: 'Success!',
              variant: 'default',
              description: res.data.message,
            });
            toggleModal(false);
          }, 500);
        } else {
          toast({
            title: 'Error!',
            variant: 'destructive',
            description: res.data.message,
          });
          setIsLoader(false);
        }
      })
      .catch((err: Error) => {
        setIsLoader(false);
        toast({
          title: 'Error!',
          variant: 'destructive',
          description: err.message,
        });
      });
  };

  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
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
          <div className="pt-[100px]">
            <div className="text-center" />
            <div className="mt-2">
              <span className="block text-center text-[14px] font-normal leading-[normal] text-[#6A6A6A]">
                A 4 digit code has been sent to
              </span>
              <span className="block text-center text-[14px] font-semibold leading-[normal] text-[#6A6A6A]">
                {email}
              </span>
              <span className="mx-10 mt-2 block text-center text-[13px] font-normal leading-[normal] text-[#6A6A6A]">
                Note: Please check your email for the OTP code and paste it
                here; otherwise, it will expire within an hour.
              </span>
              <div className="mt-[42px] flex w-full items-center justify-center text-center">
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
                  onChange={(value: string) => setOTP(value)}
                  separator={<span> </span>}
                  isInputNum
                  shouldAutoFocus
                  value={OTP}
                />
              </div>
              {OTP?.length > 3 && (
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className="flex flex-col">
                    <div className="form-group mt-[42px] w-full">
                      <label
                        htmlFor="newPassword"
                        className="mb-2 block text-[12px] font-semibold text-txt-color"
                      >
                        New Password
                      </label>
                      <br />
                      <input
                        className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                        id="newPassword"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        type="password"
                        {...register('newPassword', {
                          required: 'Password is required',
                          pattern: PATTERN.PASSWORD,
                          validate: (value) => value.length <= 150,
                        })}
                      />
                      {errors.newPassword && (
                        <p className="my-5 text-center text-xs text-red-500">
                          {errors.newPassword.message}
                        </p>
                      )}
                      {errors.newPassword?.type === 'pattern' && (
                        <p className="my-5 text-center text-xs text-red-500">
                          {INVALID_CHAR}
                        </p>
                      )}
                      {errors.newPassword?.type === 'validate' && (
                        <p className="my-5 text-center text-xs text-red-500">
                          {MAX_LENGTH_EXCEEDED}
                        </p>
                      )}
                    </div>
                    <div className="form-group mt-2 w-full">
                      <label
                        htmlFor="reNewPassword"
                        className="mb-2 block text-[12px] font-semibold text-txt-color"
                      >
                        Confirm New Password
                      </label>
                      <br />
                      <input
                        className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                        id="reNewPassword"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        type="password"
                        {...register('reNewPassword', {
                          required: 'Confirm Password is required',
                          pattern: PATTERN.PASSWORD,
                          validate: {
                            maxlength: (value) =>
                              value.length <= 100 || MAX_LENGTH_EXCEEDED,
                            matchesPrevious: (value) =>
                              value === watch('newPassword') ||
                              'Passwords do not match',
                          },
                        })}
                      />
                      {errors.reNewPassword && (
                        <p className="my-5 text-center text-xs text-red-500">
                          {errors.reNewPassword.message}
                        </p>
                      )}
                      {errors.reNewPassword?.type === 'pattern' && (
                        <p className="my-5 text-center text-xs text-red-500">
                          {INVALID_CHAR}
                        </p>
                      )}
                      {(errors.reNewPassword?.type === 'matchesPrevious' ||
                        errors.reNewPassword?.type === 'maxlength') && (
                        <p className="my-5 text-center text-xs text-red-500">
                          {errors.reNewPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-[100px] w-full px-4">
                    <button
                      className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
                      type="submit"
                    >
                      {isLoader ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <LoginModal
        openModal={showLogin}
        closeModal={setShowLogin}
        openRegisterModal={setShowRegister}
      />
      <RegisterModal openModal={showRegister} closeModal={setShowRegister} />
    </div>
  );
};

export default ForgotPasswordOtpVerificationModal;
