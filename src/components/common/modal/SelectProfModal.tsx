import assets from '@/assets';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import CardsBtn from '../cards/CardsBtnDrop';
import MainHeading from '../typography/MainHeading';

const Modal = () => {
  return (
    <div className="bg-modals">
      <Dialog>
        <DialogTrigger className="my-[20px] min-h-[160px] w-full rounded-[20px] border-2 border-primary bg-transparent p-[20px]">
          <div className="flex-2 bg-[#ccc] p-2">{/* <AddButton /> */}</div>
        </DialogTrigger>
        <DialogContent className="custom-modal bg-white">
          {/* <div className="flex justify-between items-center">
                        <div className="">
                            <span className="block text-[16px] leading-normal font-bold text-heading-color mb-[20px]">{mainTitle}</span>
                            <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{features}</span>

                        </div>

                        <div className="">
                            <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[0px]">{time}</span>


                        </div>
                    </div>
                    <div className="my-[5px] flex justify-between items-center">
                        <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">{priceTitle}</span>
                        <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">{pricing}</span>
                    </div>
                    <div className="my-[20px] ">
                        <CustomButton title="Remove" customWidth="w-full" customclass={'rounded-[10px] bg-primary text-white'} />
                    </div> */}

          <MainHeading title="Select Professional" />
          <div className="flex items-center justify-start">
            <span className="block h-[29px] w-[29px]">
              <img
                src={assets.images.avatar}
                alt="avatar"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="ml-[10px] block text-[14px] text-txt-color">
              John Smith
            </span>
          </div>

          <CardsBtn mainTitle="Beard" time="20 mins" />
          <div className="flex items-center justify-start">
            <span className="block h-[29px] w-[29px]">
              <img
                src={assets.images.avatar}
                alt="avatar"
                className="h-full w-full object-contain"
              />
            </span>
            <span className="ml-[10px] block text-[14px] text-txt-color">
              Guest 2
            </span>
          </div>
          <CardsBtn mainTitle="Hair Styling" time="40 mins - 50 mins" />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Modal;
