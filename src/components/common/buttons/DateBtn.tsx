type Props ={
    dateTitle: string;
    dayTitle: string;
    onclick?: any;
    active?: boolean;
    disabled?: boolean;
}
const DateBtn = ({dayTitle, dateTitle, onclick, active= false, disabled= false}:Props) => {
  return (
   
    <>
    {!disabled && 

                <button className='p-[0px] bg-transparent'  onClick={onclick || (() => { })}>
                    <div className={`flex justify-center items-center w-[73px] h-[73px] ${active ? 'bg-primary text-white' : 'bg-white text-primary'  } border border-primary text-[20px] leading-normal font-bold rounded-[50%]`}>
                        {dateTitle}
                    </div>
                    <div className='text-center mt-[10px] text-[14px] leading-normal text-txt-color font-semibold'>
                        {dayTitle}
                    </div>
                </button>
     }
    {disabled && 

                <button className='p-[0px] bg-transparent'  onClick={(() => { })}>
                    <div className={`flex justify-center items-center w-[73px] h-[73px] text-gray-300 border border-gray-300 text-[20px] leading-normal font-bold rounded-[50%]`}>
                        {dateTitle}
                    </div>
                    <div className='text-center mt-[10px] text-[14px] leading-normal text-gray-300 font-semibold'>
                        {dayTitle}
                    </div>
                </button>
     }
    </>
  
  )
}

export default DateBtn