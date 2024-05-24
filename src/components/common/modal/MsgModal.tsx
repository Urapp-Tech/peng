import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import React from 'react';
import MainHeading from '../typography/MainHeading';

interface LoginModalProps {
  openModal: boolean;
  handleClick: (v: string) => void;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const MsgModal: React.FC<LoginModalProps> = ({
  openModal,
  closeModal,
  handleClick = (_v = 'yes') => {},
}) => {
  const toggleModal = (val: boolean) => {
    closeModal(val);
  };
  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      <Dialog open={openModal} onOpenChange={toggleModal}>
        <DialogContent className="rounded-[30px] bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="mt-[15px] w-full text-center">
              <MainHeading
                title="Is this your first visit to peng salon & spa?"
                customClass="capitalize"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <button
              onClick={() => handleClick('Yes')}
              className="leading-noramal focus:shadow-outline mb-2 w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
              type="button"
            >
              Yes
            </button>
            <button
              onClick={() => handleClick('No')}
              className="border-1 leading-noramal focus:shadow-outline w-full rounded border-primary bg-white px-4 py-2 text-[12px] font-bold capitalize text-primary focus:outline-none"
              type="button"
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MsgModal;
