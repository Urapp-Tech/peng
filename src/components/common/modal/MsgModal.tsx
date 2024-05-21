import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import React from 'react';
import MainHeading from "../typography/MainHeading";

interface LoginModalProps {
  openModal: boolean;
  handleClick: (v :string) => void,
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  
} 
const MsgModal: React.FC<LoginModalProps> = ({openModal, closeModal, handleClick= (_v = 'yes') => {} }) => {
  const toggleModal = (val:boolean) => {
    closeModal(val);
  }
  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      <Dialog open={openModal} onOpenChange={toggleModal}>
        <DialogContent className="sm:max-w-[425px] bg-white rounded-[30px]">
          <DialogHeader>
            <DialogTitle className="text-center w-full mt-[15px]">
              <MainHeading title="Is this your first visit to peng salon & spa?" customClass="capitalize" />
            </DialogTitle>
          </DialogHeader>
          <div className="w-full">
            <button
              onClick={() => handleClick('Yes')}
              className="w-full bg-primary text-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline mb-2"
              type="button"
            >
              Yes
            </button>
            <button
              onClick={() => handleClick('No')}
              className="capitalize text-primary border-1 border-primary w-full bg-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline"
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
