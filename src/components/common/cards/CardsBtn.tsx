type Props = {
  mainTitle: string;
  time: string;
  features: string;
  pricing: string;
  onclick?: (item?: any) => void;
};
const CardsBtn = ({ mainTitle, time, features, pricing, onclick }: Props) => {
  return (
    <div
      onClick={onclick}
      className="my-[20px] min-h-[160px] rounded-[20px] border-2 border-primary p-[20px]"
    >
      <div className="flex items-center justify-between">
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
        <div className="p-2">{/* <AddButton /> */}</div>
      </div>
    </div>
  );
};

export default CardsBtn;
