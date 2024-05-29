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
const PaymentMethodModal: React.FC<LoginModalProps> = ({
  openModal,
  closeModal,
  handleClick = (_v = 'Cash') => {},
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
                title="Choose a payment method for processing"
                customClass="capitalize"
              />
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <button
              onClick={() => handleClick('Cash')}
              className="leading-noramal focus:shadow-outline mb-2 w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
              type="button"
            >
              Cash
            </button>
            <button
              onClick={() => handleClick('Online')}
              className="border-1 leading-noramal focus:shadow-outline w-full rounded border-primary bg-white px-4 py-2 text-[12px] font-bold capitalize text-primary focus:outline-none"
              type="button"
            >
              Online
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethodModal;
