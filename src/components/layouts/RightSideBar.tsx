import { useAppSelector } from "@/redux/redux-hooks";
import SubHeading from "../common/typography/SubHeading";
import { CURRENCY_SYMBOL } from "@/utils/constant";
import { Booking } from "@/redux/features/bookingSlice";
import _ from "lodash";
import { memo } from "react";

interface RightSideBarProps  {
    continueAction: (p:string) => void;
}

const RightSideBar:React.FC<RightSideBarProps> = ({continueAction}) =>  {
    const { bookings } = useAppSelector(x => x.bookingState);
    const { systemConfig } = useAppSelector(x => x.appState);
    
    return (
        <>
            <div className="w-full p-5 pb-0  border-2 border-primary rounded-[20px] min-h-[600px]">
                <div className="max-[355px] mx-auto">
                    <img src={systemConfig?.tenantConfig.banner} alt="interior" className="w-full object-contain block rounded-xl" />
                </div>
                <div className="flex justify-between items-center mt-5">
                    <SubHeading title={systemConfig?.tenantConfig.name ?? ''}/>
                </div>

                <p className="block text-txt-color text-[12px] font-semibold leading-normal">
                {systemConfig?.tenantConfig.shopAddress ?? ''}
                </p>
                { bookings.map((b, i) => (
                    <div className="flex my-[10px] justify-between" key={i}>
                        <div className="py-[10px]">
                            <span className="block text-heading-color text-[12px] font-semibold leading-normal">{b.service.name}</span>
                            <span className="block text-txt-color text-[12px] font-semibold leading-normal">{b.barber ? `${b.barber.service_time} mins with`: ''}   {b.barber ? b.barber.store_employee.name : 'Any Professional'} </span>
                        </div>

                        <div className="py-[10px]">
                            <span className="block text-heading-color text-[12px] font-semibold leading-normal">{CURRENCY_SYMBOL} {b.service.price}</span>

                        </div>
                    </div>
                ))}

                <div className="flex mt-[30px] py-[15px] justify-between border-t-2 border-primary">
                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[16px] font-bold leading-normal">Total</span>

                    </div>

                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[16px] font-bold leading-normal"> {CURRENCY_SYMBOL} {bookings.reduce((total: number, next: Booking) => total + _.toNumber( next.service.price),0)} </span>

                    </div>
                </div>

                <div className="flex mt-[30px] py-[15px] justify-between">
                    <button onClick={() => continueAction('')} className="w-full rounded-[10px] bg-primary text-white text-[16px] font-semibold leading-normal">
                        Continue
                        {/* {modalOpen && <PaymentModal />} */}
                    </button>
                </div>


            </div>
        </>

    )
}

export default memo(RightSideBar)