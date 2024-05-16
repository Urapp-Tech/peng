import assets from "@/assets";
import { Barber } from "@/interfaces/barber";

type Props = {
    professional: Barber
    ratingIcon?: any;
    customClass?: string;
    onclick?: (item: Barber) => void;
    customHeight?: string;
    checked?: boolean;
}
const ProfessionalCard = ({ professional, ratingIcon, customClass, onclick= () => {}, customHeight, checked = false }: Props) => {
    return (
        <>
            <div onClick={() => onclick(professional)} className={`border-2 border-primary rounded-[10px] px-2 py-[15px] ${ checked ? 'bg-primary text-white shadow-2xl' : ''} cursor-pointer ${customClass} ${customHeight ? customHeight : 'h-[174px]'}`} >
                <div className="flex justify-between items-center mb-[15px]">
                    <span className="text-[10px] font-semibold leading-normal">{professional.service_time} min</span>
                    <div className="flex "><span className="block pr-[5px]">
                        {ratingIcon && <img src={assets.images.rank} alt="rating-star" className="w-[10px] h-[10px]" />}
                    </span>
                        <span className={`block ${checked ? 'bg-primary text-white' : ''} text-[10px] font-semibold leading-normal`}>{professional.rating}</span>
                    </div>
                </div>
                <div className="my-[5px] text-center mb-[10px]">
                    {professional.store_employee.avatar && <img src={professional.store_employee.avatar} alt="avatar" className="w-[60px] h-[60px] object-contain mx-auto rounded-full bg-primary-foreground" />}
                </div>
                <div className="text-[14px] leading-normal font-bold text-center">
                    {professional.store_employee.name}
                </div>
            </div>
        </>
    )
}

export default ProfessionalCard