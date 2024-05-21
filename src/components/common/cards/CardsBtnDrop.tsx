
import UserDropDown from "../dropdown/UserDropDown";

type Props = {
    mainTitle: string;
    time: string;
    features ?: string;
    pricing ?: string;
    onclick?: (item?: any) => void;
}
const CardsBtn = ({ mainTitle, time, features, pricing }: Props) => {
    return (
        <>

            <div className="border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px]">
                <div className="flex justify-between items-start flex-col">
                    <div className="p-2">
                        <span className="block text-[16px] leading-normal font-bold text-heading-color mb-[10px]">{mainTitle}</span>
                        <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{time}</span>
                        <span className="block text-[14px] leading-normal font-semibold text-txt-color  mb-[10px]">{features}</span>
                        <span className="block text-[14px] leading-normal font-semibold text-heading-color  mb-[10px]">{pricing}</span>
                    </div>
                    <div className="p-2">
                        <UserDropDown title="AnyProfessional"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsBtn;