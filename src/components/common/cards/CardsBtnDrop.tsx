import UserDropDown from '../dropdown/UserDropDown';

type Props = {
  mainTitle: string;
  time: string;
  features?: string;
  pricing?: string;
  onclick?: (item?: any) => void;
};
const CardsBtn = ({ mainTitle, time, features, pricing }: Props) => {
  return (
    <div className="my-[20px] min-h-[160px] rounded-[20px] border-2 border-primary p-[20px]">
      <div className="flex flex-col items-start justify-between">
        <div className="p-2">
          <span className="mb-[10px] block text-[16px] font-bold leading-normal text-heading-color">
            {mainTitle}
          </span>
          <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
            {time}
          </span>
          <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-txt-color">
            {features}
          </span>
          <span className="mb-[10px] block text-[14px] font-semibold leading-normal  text-heading-color">
            {pricing}
          </span>
        </div>
        <div className="p-2">
          <UserDropDown title="AnyProfessional" />
        </div>
      </div>
    </div>
  );
};

export default CardsBtn;
