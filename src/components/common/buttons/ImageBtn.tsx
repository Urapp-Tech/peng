import assets from '@/assets';

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
};
const ImageBtn = ({
  title,
  category,
  ratingTxt,
  ratingIcon,
  customClass,
  onclick,
  customHeight,
  customWidth,
  avatarIcon,
}: Props) => {
  return (
    <div
      onClick={onclick}
      className={`rounded-[10px] border-2 border-primary px-2 py-[15px]  ${customClass} ${customWidth ?? 'w-[32%]'} ${customHeight ?? 'h-[174px]'}`}
    >
      <div className="mb-[15px] flex items-center justify-between">
        <span className="text-[10px] font-semibold leading-normal text-txt-color ">
          {category}
        </span>
        <div className="flex ">
          <span className="block pr-[5px]">
            {ratingIcon && (
              <img
                src={assets.images.rank}
                alt="rating-star"
                className="h-[10px] w-[10px]"
              />
            )}
          </span>
          <span className="block text-[10px] font-semibold leading-normal text-primary">
            {ratingTxt}
          </span>
        </div>
      </div>
      <div className="my-[5px] mb-[10px] text-center">
        {avatarIcon && (
          <img
            src={avatarIcon}
            alt="avatar"
            className="mx-auto h-[60px] w-[60px] object-contain"
          />
        )}
      </div>
      <div className="text-center text-[14px] font-bold leading-normal text-heading-color">
        {title}
      </div>
    </div>
  );
};

export default ImageBtn;
