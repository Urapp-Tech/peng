/* eslint-disable import/prefer-default-export */
import MainHeading from '../typography/MainHeading';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface AppointmentSuccessAlertPops {
  open: boolean;
  closeModal: (val: boolean) => void;
}

const AppointmentSuccessAlert: React.FC<AppointmentSuccessAlertPops> = ({
  open,
  closeModal,
}) => {
  return (
    <div className="bg-modals rounded-[30px] bg-[#000]">
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="rounded-[30px] bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center">
              <MainHeading
                title="booking request submitted successfully!"
                customClass="capitalize leading-10 mb-2"
              />
            </DialogTitle>
            <DialogDescription className="text-center">
              Your appointment has been booked successfully. Our representative
              may call you soon.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <button
              onClick={() => closeModal(false)}
              className="leading-noramal focus:shadow-outline mb-2 w-full rounded bg-primary px-4 py-2 text-[12px] font-bold text-white focus:outline-none"
              type="button"
            >
              Close
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentSuccessAlert;
