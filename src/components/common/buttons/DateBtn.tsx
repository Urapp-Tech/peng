type Props = {
  dateTitle: string;
  dayTitle: string;
  onclick?: any;
  active?: boolean;
  disabled?: boolean;
};
const DateBtn = ({
  dayTitle,
  dateTitle,
  onclick,
  active = false,
  disabled = false,
}: Props) => {
  return (
    <>
      {!disabled && (
        <button
          className="bg-transparent p-[0px]"
          onClick={onclick || (() => {})}
        >
          <div
            className={`flex h-[73px] w-[73px] items-center justify-center ${active ? 'bg-primary text-white' : 'bg-white text-primary'} rounded-[50%] border border-primary text-[20px] font-bold leading-normal`}
          >
            {dateTitle}
          </div>
          <div className="mt-[10px] text-center text-[14px] font-semibold leading-normal text-txt-color">
            {dayTitle}
          </div>
        </button>
      )}
      {disabled && (
        <button className="bg-transparent p-[0px]" onClick={() => {}}>
          <div className="flex h-[73px] w-[73px] items-center justify-center rounded-[50%] border border-gray-300 text-[20px] font-bold leading-normal text-gray-300">
            {dateTitle}
          </div>
          <div className="mt-[10px] text-center text-[14px] font-semibold leading-normal text-gray-300">
            {dayTitle}
          </div>
        </button>
      )}
    </>
  );
};

export default DateBtn;
