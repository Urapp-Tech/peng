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
  customclass?: string;
  fontWeight?: string;
  fontSize?: string;
};

const CustomButton = ({
  title,
  bgColor,
  textColor,
  onclick,
  fontSize,
  iconLeft,
  iconRight,
  customWidth,
  customBorder,
  customHeight,
  nofocus,
  nohover,
  type,
  isloader,
  fontWeight,
  customclass,
}: Props) => {
  return (
    <button
      disabled={isloader}
      type={type && type}
      onClick={onclick || (() => {})}
      className={`inline-block
                cursor-pointer
                ${customWidth ?? 'w-[229.207px]'}
                ${customHeight ?? 'h-[50px]'}
                ${customBorder ?? 'border-0'}
                
                ${bgColor} 
                ${textColor}
                ${fontWeight ?? 'font-semibold'}
                ${customclass ?? 'capitalize'}
               
                leading-normal 
                transition duration-150 ease-in-out
                ${!nohover && 'hover:bg-[#D9D7F1]'}
                ${!nofocus && 'focus:bg-primary-600'}
                `}
    >
      <p
        className={`flex items-center justify-center  ${fontSize ?? 'text-sm'}`}
      >
        {iconLeft && (
          <img alt="icon left" src={iconLeft} className="w-25 h-25 mr-3" />
        )}
        {isloader ? (
          <div className="flex items-center">
            <p>Loading...</p>
          </div>
        ) : (
          title
        )}
        {iconRight && (
          <img alt="icon right" src={iconRight} className="w-25 h-25 ml-3" />
        )}
      </p>
    </button>
  );
};

export default CustomButton;
