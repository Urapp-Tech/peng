import assets from "@/assets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import CustomButton from "../buttons/CustomButton";

interface LoginModalProps {
  openModal: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  openRegisterModal: any;
} 
const LoginModal: React.FC<LoginModalProps> = ({openModal, closeModal,openRegisterModal}) => {
  const toggleModal = (val:boolean) => {
    closeModal(val);
  }
  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      <Dialog open={openModal} onOpenChange={toggleModal}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[30px]">
          <DialogHeader>
            <DialogTitle className="text-center w-full mt-[15px]">
              <img
                src={assets.images.greenLogo}
                alt="logo"
                className="mx-auto"
              />
            </DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <div className="w-full">
            <form className="bg-white px-1 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-txt-color text-[12px] font-semibold mb-2"
                  htmlFor="username"
                >
                  Username or email
                </label>
                <input
                  className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-1">
                <label
                  className="block text-txt-color text-[12px] font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none "
                  id="password"
                  type="password"
                  placeholder="******************"
                />
              </div>
              <div className="flex items-center justify-end mb-2">
                <a
                  className="inline-block align-baseline font-bold text-[12px] text-primary"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="w-full bg-primary text-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Sign In
                </button>
              </div>
              <div className="relative brk-points flex justify-between items-center my-[20px] opacity-[0.5]">
                <span className="w-[45%] bg-primary h-[1px] block"></span>
                <span className="block text-txt-color w-[10%] text-center">
                  or
                </span>
                <span className="w-[45%] bg-primary h-[1px] block"></span>
              </div>
              <div className="my-[15px] flex justify-between items-center">
                <div className="mr-[10px] flex-1">
                  <CustomButton
                    title="Google"
                    iconLeft={assets.images.google}
                    customWidth="w-full"
                    bgColor="bg-lime-green"
                    customclass={
                      "hover:bg-primary leading-normal font-bold hover:text-white"
                    }
                    fontSize="text-[12px]"
                    textColor="text-txt-color"
                  />
                </div>
                <div className="mr-[10px] flex-1">
                  <CustomButton
                    title="Facebook"
                    iconLeft={assets.images.facebook}
                    customWidth="w-full"
                    bgColor="bg-lime-green"
                    customclass={
                      " hover:bg-primary leading-normal font-bold hover:text-white"
                    }
                    fontSize="text-[12px]"
                    textColor="text-txt-color"
                  />
                </div>
              </div>
              <div className="my-[15px] text-center flex justify-center">
                <span className="text-heading-color text-[12px] font-bold leading-normal block mr-1">
                  Are you new?{" "}
                </span>
                <div className="text-primary text-[12px] font-semibold cursor-pointer"
                onClick={()=>{
                  closeModal(false)
                  openRegisterModal(true)
                 }}
                >
                  Create an Account
                </div>
                {/* <button
                //  onClick={()=>{
                //   closeModal(true)
                //   // openRegisterModal(true)
                // }}
                 className="text-primary text-[12px] font-semibold">
                  Create and account
                </button> */}
              </div>
            </form>
            {/* <p className="text-center text-gray-500 text-xs">
    ©2020 Acme Corp. All rights reserved.
  </p> */}
          </div>

          {/* <DialogFooter>
          <button type="submit">Save changes</button>
        </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default LoginModal;
