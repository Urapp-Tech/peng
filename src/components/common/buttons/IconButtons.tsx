type Props = {
  title: string;
  subTitle?: string;
  customClass?: string;
  onclick?: (item?: any) => void;
  customWidth?: string;
  customHeight?: string;
  avatarIcon?: string;
};
const IconButtons = ({
  title,
  customClass,
  subTitle,
  onclick,
  customHeight,
  customWidth,
  avatarIcon,
}: Props) => {
  return (
    <div
      className={`rounded-[10px] border-2 border-primary px-2 py-[15px]  ${customClass} ${customWidth ?? 'w-[32%]'} ${customHeight ?? 'h-[174px]'}`}
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
      <div className="mx-auto mb-[5px] max-w-[130px] text-center text-[12px] font-bold leading-normal text-heading-color">
        {title}
      </div>
      <div className="mx-auto max-w-[130px] text-center text-[10px] font-semibold leading-normal text-txt-color">
        {subTitle}
      </div>
    </div>
  );
};

export default IconButtons;
