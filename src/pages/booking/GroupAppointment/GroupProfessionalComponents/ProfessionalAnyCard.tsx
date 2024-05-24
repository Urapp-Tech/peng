type Props = {
  title: string;
  subTitle?: string;
  customClass?: string;
  onclick?: (item?: any) => void;
  customWidth?: string;
  customHeight?: string;
  avatarIcon?: string;
  checked?: boolean;
};
const ProfessionalAnyCard = ({
  title,
  customClass,
  subTitle,
  onclick,
  customHeight,
  customWidth,
  avatarIcon,
  checked,
}: Props) => {
  return (
    <div
      className={`border-2 border-primary ${checked ? 'bg-primary text-white shadow-2xl' : ''} cursor-pointer rounded-[10px] px-2 py-[15px] ${customClass} ${customHeight ?? 'h-[174px]'}`}
      onClick={onclick}
    >
      <div className="my-[5px] mb-[10px] mt-[30px] text-center">
        {avatarIcon && (
          <img
            src={avatarIcon}
            alt="avatar"
            className={`${customClass} ${customWidth ?? 'w-[auto]'} ${customHeight ?? 'h-auto'} !mx-auto object-contain `}
          />
        )}
      </div>
      <div
        className={`text-[12px] leading-normal  ${checked ? 'bg-primary text-white' : 'text-heading-color '} mx-auto mb-[5px] max-w-[130px] text-center font-bold`}
      >
        {title}
      </div>
      <div
        className={`${checked ? 'bg-primary text-white' : 'text-txt-color '} mx-auto max-w-[130px] text-center text-[10px] font-semibold leading-normal text-txt-color`}
      >
        {subTitle}
      </div>
    </div>
  );
};

export default ProfessionalAnyCard;
