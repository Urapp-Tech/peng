import assets from '@/assets';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import CustomButton from '../buttons/CustomButton';
import DateOfBirthInput from '../buttons/DobBtn';
import MainHeading from '../typography/MainHeading';

const PaymentModal = () => {
  return (
    <div className="bg-msg-modals rounded-[30px] bg-[#000]">
      <Dialog>
        <DialogTrigger asChild>
          {/* <button>Edit Profile</button> */}
        </DialogTrigger>
        <DialogContent className="h-[90%] rounded-[30px] bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mt-[15px] w-full text-center">
              <img
                src={assets.images.greenLogo}
                alt="logo"
                className="mx-auto"
              />
              <MainHeading title="Payment Method" />
              <p className="my-[10px] text-[10px] font-semibold leading-normal text-txt-color">
                You won’t be charged now. payment will be collected in store
                after your appointment
              </p>
            </DialogTitle>
            {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
          </DialogHeader>
          <div className="h-auto w-full overflow-auto ">
            <form className="mb-1 bg-white px-1 pb-1 pt-2">
              <div className="mb-2 flex items-center justify-between max-md:flex-col">
                <div className="md:max-pr-0 md:max:w-full pr-1 max-md:mb-2">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="username"
                  >
                    Card Holder Name
                  </label>
                  <input
                    className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="md:max-pl-0 md:max:w-full pl-1">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="1234...."
                  >
                    Card Number
                  </label>
                  <input
                    className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
              </div>
              <div className="mb-2 flex items-center justify-between max-md:flex-col">
                <div className="md:max-pr-0 md:max:w-full mb-2 flex-1 pr-1">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="email"
                  >
                    Expiry Date
                  </label>
                  <DateOfBirthInput />
                </div>
                <div className="md:max-pl-0 md:max:w-full mb-2 flex-1 pl-1">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="username"
                  >
                    CVC
                  </label>
                  <input
                    className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="0000...."
                  />
                </div>
              </div>
              <p className="my-[10px] text-[10px] font-semibold leading-normal text-txt-color">
                Pay Securely from Visa, Master, Amex
              </p>
              <div className="mb-2 flex items-center justify-between max-md:flex-col">
                <div className="md:max-pl-0 md:max:w-full mb-2 flex-1 pl-1">
                  <label
                    className="mb-1 block text-[12px] font-semibold text-txt-color"
                    htmlFor="username"
                  >
                    Discount Code
                  </label>
                  <input
                    className="w-full appearance-none rounded border border-primary px-3 py-2 leading-tight text-txt-color focus:outline-none"
                    id="username"
                    type="text"
                    placeholder="0000...."
                  />
                </div>
                <div className="md:max-pl-0 md:max:w-full mb-2 flex-1 pl-1">
                  <CustomButton
                    title="Apply"
                    customWidth="w-full"
                    customclass="hover:bg-primary mt-[23px]"
                    bgColor="bg-primary"
                    textColor="text-white"
                    customHeight="h-[40px]"
                  />
                </div>
              </div>

              <div className="my-[10px] flex items-start justify-between">
                <div className="my-[10px] flex-1">
                  <span className="block text-left text-[12px] font-semibold leading-normal text-heading-color">
                    Haircut
                  </span>
                  <span className="block text-left text-[12px] font-semibold leading-normal text-txt-color">
                    40 min - 50 mins
                  </span>
                </div>
                <div className="my-[10px] flex-1">
                  <span className="block text-right text-[12px] font-semibold leading-normal text-heading-color">
                    from AED 250
                  </span>
                </div>
              </div>

              <div className="my-[10px] flex items-start justify-between">
                <div className="my-[10px] flex-1">
                  <span className="block text-left text-[12px] font-semibold leading-normal text-heading-color">
                    Haircut
                  </span>
                  <span className="block text-left text-[12px] font-semibold leading-normal text-txt-color">
                    40 min - 50 mins
                  </span>
                </div>
                <div className="my-[10px] flex-1">
                  <span className="block text-right text-[12px] font-semibold leading-normal text-heading-color">
                    from AED 250
                  </span>
                </div>
              </div>
              <div className="my-[10px] flex items-start justify-between">
                <div className="my-[10px] flex-1">
                  <span className="block text-left text-[12px] font-semibold leading-normal text-heading-color">
                    Haircut
                  </span>
                  <span className="block text-left text-[12px] font-semibold leading-normal text-txt-color">
                    40 min - 50 mins
                  </span>
                </div>
                <div className="my-[10px] flex-1">
                  <span className="block text-right text-[12px] font-semibold leading-normal text-heading-color">
                    from AED 250
                  </span>
                </div>
              </div>
              <div className="my-[10px] flex items-center justify-between border-t-2 border-primary py-[20px]">
                <span className="block flex-1 self-start text-[16px] font-semibold capitalize leading-normal text-heading-color">
                  Total
                </span>
                <span className="block flex-1 text-right text-[16px] font-semibold capitalize leading-normal text-heading-color">
                  From AED 485
                </span>
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="leading-noramal focus:shadow-outline w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
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
