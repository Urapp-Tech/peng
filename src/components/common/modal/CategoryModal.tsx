import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import CustomButton from "../buttons/CustomButton";
type Props = {
    mainTitle: string;
    time: string;
    features: string;
    pricing: string;
    priceTitle: string;

}
const CategoryModal = ({ mainTitle, time, features, pricing, priceTitle }: Props) => {
    return (
        <div className="bg-modals">
            <Dialog>
                <DialogTrigger className="w-full bg-transparent border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px]">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 text-left p-2">
                            <span className="block text-[16px] leading-normal font-bold text-heading-color mb-[10px]">{mainTitle}</span>
                            <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{time}</span>
                            <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{features}</span>
                            <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">{pricing}</span>
                        </div>
                        <div className="flex-2 p-2">
                            {/* <AddButton /> */}
                        </div>
                    </div>

                </DialogTrigger>
                <DialogContent className="bg-white custom-modal">

                    <div className="flex justify-between items-center">
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
                    </div>
                </DialogContent>
            </Dialog>
        </div>


    )
}
export default CategoryModal;