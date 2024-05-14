import assets from "@/assets";

type Props = {
    title: string;
    category: string;
    ratingTxt: string;
    ratingIcon?: any;
    customClass?: string;
    onclick?: (item?: any) => void;
    customWidth?: string;
    customHeight?: string;
    avatarIcon?: string;
}
const ImageBtn = ({ title, category, ratingTxt, ratingIcon, customClass, onclick, customHeight, customWidth, avatarIcon }: Props) => {
    return (
        <>
            <div onClick={onclick} className={`border-2 border-primary rounded-[10px] px-2 py-[15px]  ${customClass} ${customWidth ? customWidth : 'w-[30%]'} ${customHeight ? customHeight : 'h-[174px]'}`} >
                <div className="flex justify-between items-center mb-[15px]">
                    <span className="text-[10px] font-semibold leading-normal text-txt-color ">{category}</span>
                    <div className="flex "><span className="block pr-[5px]">
                        {ratingIcon && <img src={assets.images.rank} alt="rating-star" className="w-[10px] h-[10px]" />}
                    </span>
                        <span className="block text-primary text-[10px] font-semibold leading-normal">{ratingTxt}</span>
                    </div>
                </div>
                <div className="my-[5px] text-center mb-[10px]">
                    {avatarIcon && <img src={avatarIcon} alt="avatar" className="w-[60px] h-[60px] object-contain mx-auto" />}
                </div>
                <div className="text-[14px] leading-normal text-heading-color font-bold text-center">
                    {title}
                </div>
            </div>
        </>
    )
}

export default ImageBtn