import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import CustomButton from "../buttons/CustomButton";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { addService, removeService } from "@/redux/features/bookingSlice";
type Props = {
    service: StoreService;
    open: boolean;
    handleClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const ServiceDetailDialog = ({ service, open, handleClose}: Props) => {
    const dispatch = useAppDispatch();
    const { bookings } = useAppSelector(s => s.bookingState)

    
    const handleAddButtonClick = (val: boolean) => {
        if(val) {
            dispatch(addService(service));
        }
        else {
            dispatch(removeService(service));
        }
    }
 

    return (
        <div className="bg-modals">
            <Dialog open={open} onOpenChange={handleClose}>
                <DialogContent className="bg-white custom-modal">

                    <div className="flex justify-between items-center">
                        <div className="">
                            <span className="block text-[16px] leading-normal font-bold text-heading-color mb-[20px]">{service.name}</span>
                            <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{service.description}</span>

                        </div>
                    </div>
                    <div className="my-[5px] flex justify-between items-center">
                        <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">Price</span>
                        <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">{service.price}</span>
                    </div>
                    <div className="my-[20px] ">
                        {
                            bookings.find(x => x.service.id === service.id) 
                            ? <CustomButton title="Remove" customWidth="w-full" onclick={() => handleAddButtonClick(false)} customclass={'rounded-[10px] bg-primary text-white'} />
                            : <CustomButton title="Add" customWidth="w-full" onclick={() => handleAddButtonClick(true)} customclass={'rounded-[10px] bg-primary text-white'} />
                        }
                    </div>
                </DialogContent>
            </Dialog>
        </div>


    )
}
export default ServiceDetailDialog;