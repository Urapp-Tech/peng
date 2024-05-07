

type Props = {
    title: string;
    bgColor?: string;
    textColor?: string;
    iconLeft?: any;
    iconRight?: any;
    customWidth?: string;
    customHeight?: string;
    customBorder?: string;
    nofocus?: any;
    nohover?: any;
    onclick?: (item?: any) => void;
    type?: any;
    isloader?: boolean;
    customclass?: String;
    fontWeight?: String;
    fontSize?: String;
}

const CustomButton = ({ title, bgColor, textColor, onclick, fontSize, iconLeft, iconRight, customWidth, customBorder, customHeight, nofocus, nohover, type, isloader, fontWeight, customclass }: Props) => {

    return (
        <button
            disabled={isloader}
            type={type && type}
            onClick={onclick || (() => { })}
            className={`inline-block
                cursor-pointer
                ${customWidth ? customWidth : 'w-[229.207px]'}
                ${customHeight ? customHeight : 'h-[50px]'}
                ${customBorder ? customBorder : 'border-0'}
                
                ${bgColor} 
                ${textColor}
                ${fontWeight ? fontWeight : 'font-semibold'}
                ${customclass ? customclass : 'capitalize'}
               
                leading-normal 
                transition duration-150 ease-in-out
                ${!nohover && 'hover:bg-[#D9D7F1]'}
                ${!nofocus && 'focus:bg-primary-600'}
                `}>
            <p className={`flex items-center justify-center  ${fontSize ? fontSize : 'text-sm'}`}>
                {iconLeft && <img src={iconLeft} className="mr-3 w-25 h-25" />}
                {isloader ?
                    <div className="flex items-center">
                        <p>Loading...</p>
                    </div> :
                    title
                }
                {iconRight && <img src={iconRight} className="ml-3 w-25 h-25" />}
            </p>
        </button>
    )
}

export default CustomButton;