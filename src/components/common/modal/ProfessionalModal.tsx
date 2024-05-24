import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CustomButton from '../buttons/CustomButton';
import UserDropDown from '../dropdown/UserDropDown';

type Props = {
  mainTitle: string;
  time: string;
  features: string;
  pricing: string;
  priceTitle: string;
};
const Modal = ({ mainTitle, time, features, pricing, priceTitle }: Props) => {
  return (
    <div className="bg-modals">
      <Dialog>
        <DialogTrigger className="my-[20px] min-h-[160px] w-full rounded-[20px] border-2 border-primary bg-transparent p-[20px]">
          <div className="flex items-center justify-between">
            <div className="flex-1 p-2 text-left">
              <span className="mb-[10px] block text-[16px] font-bold leading-normal text-heading-color">
                {mainTitle}
              </span>
              <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
                {time}
              </span>
            </div>
            <div className="flex-2 p-2">
              <UserDropDown />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="custom-modal bg-white">
          <div className="flex items-center justify-between">
            <div className="">
              <span className="mb-[20px] block text-[16px] font-bold leading-normal text-heading-color">
                {mainTitle}
              </span>
              <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
                {features}
              </span>
            </div>

            <div className="">
              <span className="mb-[0px] block text-[14px] font-semibold leading-normal  text-txt-color">
                {time}
              </span>
            </div>
          </div>
          <div className="my-[5px] flex items-center justify-between">
            <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
              {priceTitle}
            </span>
            <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
              {pricing}
            </span>
          </div>
          <div className="my-[20px] ">
            <CustomButton
              title="Remove"
              customWidth="w-full"
              customclass="rounded-[10px] bg-primary text-white"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Modal;
