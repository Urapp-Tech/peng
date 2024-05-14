
type Props = {
    title: string;
    subTitle?: string;
    customClass?: string;
    onclick?: (item?: any) => void;
    customWidth?: string;
    customHeight?: string;
    avatarIcon?: string;
}
const IconButtons = ({ title, customClass, subTitle, onclick, customHeight, customWidth, avatarIcon }: Props) => {
    return (
        <>
            <div className={`border-2 border-primary rounded-[10px] px-2 py-[15px]  ${customClass} ${customWidth ? customWidth : 'w-[30%]'} ${customHeight ? customHeight : 'h-[174px]'}`}  onClick={onclick}>

                <div className="my-[5px] text-center mb-[10px] mt-[30px]">
                    {avatarIcon && <img src={avatarIcon} alt="avatar" className={`${customClass} ${customWidth ? customWidth : 'w-[auto]'} ${customHeight ? customHeight : 'h-auto'} object-contain mx-auto `} />}
                </div>
                <div className="text-[12px] leading-normal text-heading-color font-bold text-center mb-[5px] max-w-[130px] mx-auto">
                    {title}
                </div>
                <div className="text-[10px] leading-normal text-txt-color font-semibold text-center max-w-[130px] mx-auto">
                    {subTitle}
                </div>
            </div>
        </>
    )
}

export default IconButtons