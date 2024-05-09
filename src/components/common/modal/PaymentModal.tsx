import assets from "@/assets";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CustomButton from "../buttons/CustomButton";
import { DateOfBirthInput } from "../buttons/DobBtn";
import MainHeading from "../typography/MainHeading";

const PaymentModal = () => {
  return (
    <div className="bg-msg-modals rounded-[30px] bg-[#000]">
      <Dialog>
        <DialogTrigger asChild>
          <button>Edit Profile</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[30px] h-[90%]">
          <DialogHeader>
            <DialogTitle className="text-center w-full mt-[15px]">
              <img
                src={assets.images.greenLogo}
                alt="logo"
                className="mx-auto"
              />
              <MainHeading title="Payment Method" />
              <p className="my-[10px] text-[10px] leading-normal font-semibold text-txt-color">
                You won’t be charged now. payment will be collected in store
                after your appointment
              </p>
            </DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <div className="w-full overflow-auto h-auto ">
            <form className="bg-white px-1 pt-2 pb-1 mb-1">
              <div className="flex justify-between items-center mb-2">
                <div className="pr-1">
                  <label
                    className="block text-txt-color text-[12px] font-semibold mb-1"
                    htmlFor="username"
                  >
                    Card Holder Name
                  </label>
                  <input
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="pl-1">
                  <label
                    className="block text-txt-color text-[12px] font-semibold mb-1"
                    htmlFor="1234...."
                  >
                    Card Number
                  </label>
                  <input
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="mb-2 flex-1 pr-1">
                  <label
                    className="block text-txt-color text-[12px] font-semibold mb-1"
                    htmlFor="email"
                  >
                    Expiry Date
                  </label>
                  <DateOfBirthInput />
                </div>
                <div className="pl-1 mb-2 flex-1">
                  <label
                    className="block text-txt-color text-[12px] font-semibold mb-1"
                    htmlFor="username"
                  >
                    CVC
                  </label>
                  <input
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="0000...."
                  />
                </div>
              </div>
              <p className="my-[10px] text-[10px] text-txt-color leading-normal font-semibold">
              Pay Securely from Visa, Master, Amex
              </p>
              <div className="flex justify-between items-center mb-2">
              <div className="pl-1 mb-2 flex-1">
                  <label
                    className="block text-txt-color text-[12px] font-semibold mb-1"
                    htmlFor="username"
                  >
                    Discount Code
                  </label>
                  <input
                    className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="0000...."
                  />
                </div>
                <div className="pl-1 mb-2 flex-1">
                 <CustomButton title="Apply" customWidth="w-full" customclass="hover:bg-primary mt-[23px]" bgColor="bg-primary" textColor="text-white" customHeight="h-[40px]"/>
                </div>
              </div>

                <div className="flex justify-between items-start my-[10px]">
                    <div className="flex-1 my-[10px]">
                        <span className="text-heading-color text-[12px] font-semibold leading-normal block text-left">Haircut</span>
                        <span className="text-txt-color text-[12px] font-semibold leading-normal block text-left">40 min - 50 mins</span>
                    </div>
                    <div className="flex-1 my-[10px]">
                        <span className="text-heading-color text-[12px] font-semibold leading-normal text-right block">from AED 250</span>
                    </div>
                </div>

                <div className="flex justify-between items-start my-[10px]">
                    <div className="flex-1 my-[10px]">
                        <span className="text-heading-color text-[12px] font-semibold leading-normal block text-left">Haircut</span>
                        <span className="text-txt-color text-[12px] font-semibold leading-normal block text-left">40 min - 50 mins</span>
                    </div>
                    <div className="flex-1 my-[10px]">
                        <span className="text-heading-color text-[12px] font-semibold leading-normal text-right block">from AED 250</span>
                    </div>
                </div>
                <div className="flex justify-between items-start my-[10px]">
                    <div className="flex-1 my-[10px]">
                        <span className="text-heading-color text-[12px] font-semibold leading-normal block text-left">Haircut</span>
                        <span className="text-txt-color text-[12px] font-semibold leading-normal block text-left">40 min - 50 mins</span>
                    </div>
                    <div className="flex-1 my-[10px]">
                        <span className="text-heading-color text-[12px] font-semibold leading-normal text-right block">from AED 250</span>
                    </div>
                </div>
             <div className="flex justify-between items-center my-[10px] border-t-2 border-primary py-[20px]">
                <span className="flex-1 block text-heading-color text-[16px] leading-normal font-semibold capitalize self-start">Total</span>
                <span className="flex-1 block text-heading-color text-[16px] leading-normal font-semibold capitalize text-right">From AED 485</span>
             </div>

              <div className="flex items-center justify-center">
                <button
                  className="w-full bg-primary text-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Confirm
                </button>
              </div>

             
            </form>

          </div>

          {/* <DialogFooter>
          <button type="submit">Save changes</button>
        </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default PaymentModal;
