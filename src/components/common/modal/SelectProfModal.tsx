import assets from "@/assets";
import {
    Dialog,
    DialogContent,
    DialogTrigger
} from "@/components/ui/dialog";
import AddButton from "../buttons/AddBtn";
import CardsBtn from "../cards/CardsBtnDrop";
import MainHeading from "../typography/MainHeading";
type Props = {
    mainTitle: string;
    time: string;
    features: string;
    pricing: string;
    priceTitle: string;

}
const Modal = () => {
    return (
        <div className="bg-modals">
            <Dialog>
                <DialogTrigger className="w-full bg-transparent border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px]">
                 
                        <div className="flex-2 p-2 bg-[#ccc]">
                            <AddButton />
                        </div>
                    

                </DialogTrigger>
                <DialogContent className="bg-white custom-modal">

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

                    <MainHeading title="Select Professional"/>
                    <div className="flex items-center justify-start">
                        <span className="block w-[29px] h-[29px]">
                            <img src={assets.images.avatar} alt="image icon" className="w-full object-contain h-full"/>
                        </span>
                        <span className="block text-txt-color text-[14px] ml-[10px]">
                            John Smith
                        </span>
                    </div>
                   
                    <CardsBtn mainTitle="Beard" time="20 mins"/>
                    <div className="flex items-center justify-start">
                        <span className="block w-[29px] h-[29px]">
                            <img src={assets.images.avatar} alt="image icon" className="w-full object-contain h-full"/>
                        </span>
                        <span className="block text-txt-color text-[14px] ml-[10px]">
                            Guest 2
                        </span>
                    </div>
                    <CardsBtn mainTitle="Hair Styling" time="40 mins - 50 mins"/>
                </DialogContent>
            </Dialog>
        </div>


    )
}
export default Modal;