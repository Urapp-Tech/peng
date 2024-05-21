
type Props = {
    title: string;
    subTitle?: string;
    customClass?: string;
    onclick?: (item?: any) => void;
    customWidth?: string;
    customHeight?: string;
    avatarIcon?: string;
    checked?: boolean;
}
const ProfessionalAnyCard = ({ title, customClass, subTitle, onclick, customHeight, customWidth, avatarIcon, checked }: Props) => {
    return (
        <>
            <div className={`border-2 border-primary ${ checked ? 'bg-primary text-white shadow-2xl' : ''} rounded-[10px] px-2 py-[15px] cursor-pointer ${customClass} ${customHeight ? customHeight : 'h-[174px]'}`}  onClick={onclick}>

                <div className="my-[5px] text-center mb-[10px] mt-[30px]">
                    {avatarIcon && <img src={avatarIcon} alt="avatar" className={`${customClass} ${customWidth ? customWidth : 'w-[auto]'} ${customHeight ? customHeight : 'h-auto'} object-contain !mx-auto `} />}
                </div>
                <div className={`text-[12px] leading-normal  ${checked ? 'bg-primary text-white' : 'text-heading-color '} font-bold text-center mb-[5px] max-w-[130px] mx-auto`}>
                    {title}
                </div>
                <div className="text-[10px] leading-normal  ${checked ? 'bg-primary text-white' : 'text-txt-color '} text-txt-color font-semibold text-center max-w-[130px] mx-auto">
                    {subTitle}
                </div>
            </div>
        </>
    )
}

export default ProfessionalAnyCard