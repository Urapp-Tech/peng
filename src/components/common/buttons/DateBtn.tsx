type Props ={
    dateTitle: string;
    dayTitle: string;
    onclick?: any;
}
const DateBtn = ({dayTitle, dateTitle, onclick}:Props) => {
  return (
   
                <button className='p-[0px] bg-transparent'  onClick={onclick || (() => { })}>
                    <div className='flex justify-center items-center w-[73px] h-[73px] bg-primary text-white text-[20px] leading-normal font-bold rounded-[50%]'>
                        {dateTitle}
                    </div>
                    <div className='text-center mt-[10px] text-[14px] leading-normal text-txt-color font-semibold'>
                        {dayTitle}
                    </div>
                </button>
  
  )
}

export default DateBtn