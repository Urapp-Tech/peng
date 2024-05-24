import assets from '@/assets';
import { Barber } from '@/interfaces/barber';

type Props = {
  professional: Barber;
  ratingIcon?: any;
  customClass?: string;
  onclick?: (item: Barber) => void;
  customHeight?: string;
  checked?: boolean;
};
const ProfessionalCard = ({
  professional,
  ratingIcon,
  customClass,
  onclick = () => {},
  customHeight,
  checked = false,
}: Props) => {
  return (
    <div
      onClick={() => onclick(professional)}
      className={`rounded-[10px] border-2 border-primary px-2 py-[15px] ${checked ? 'bg-primary text-white shadow-2xl' : ''} cursor-pointer ${customClass} ${customHeight ?? 'h-[174px]'}`}
    >
      <div className="mb-[15px] flex items-center justify-between">
        <span className="text-[10px] font-semibold leading-normal">
          {professional.service_time} min
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
          <span
            className={`block ${checked ? 'bg-primary text-white' : ''} text-[10px] font-semibold leading-normal`}
          >
            {professional.rating}
          </span>
        </div>
      </div>
      <div className="my-[5px] mb-[10px] text-center">
        {professional.store_employee.avatar && (
          <img
            src={professional.store_employee.avatar}
            alt="avatar"
            className="mx-auto h-[60px] w-[60px] rounded-full bg-primary-foreground object-contain"
          />
        )}
      </div>
      <div className="text-center text-[14px] font-bold leading-normal">
        {professional.store_employee.name}
      </div>
    </div>
  );
};

export default ProfessionalCard;
