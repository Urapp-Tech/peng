import BannerSwiper from '@/components/common/BannerSwiper';
import SubHeading from '@/components/common/typography/SubHeading';
import { GroupBooking } from '@/redux/features/groupBookingSlice';
import { useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY_SYMBOL } from '@/utils/constant';
import dayjs from 'dayjs';
import _ from 'lodash';
import { CalendarIcon, Clock5Icon } from 'lucide-react';
import { memo, useEffect, useState } from 'react';

interface RightSideBarProps {
  continueAction: (p: string) => void;
}

const GroupBookingRightSideBar: React.FC<RightSideBarProps> = ({
  continueAction,
}) => {
  const { bookings, appointmentTime } = useAppSelector(
    (x) => x.groupBookingState
  );
  const [customers, setCustomers] = useState<string[]>([]);
  const { systemConfig } = useAppSelector((x) => x.appState);
  const { user } = useAppSelector((x) => x.authState);

  // console.log('enableLoyaltyProgram', systemConfig, user);

  const getDiscount = () => {
    if (
      bookings.reduce(
        (total: number, next: GroupBooking) =>
          total + _.toNumber(next.service.price),
        0
      ) > 0 &&
      systemConfig?.tenantConfig?.enableLoyaltyProgram &&
      user?.loyaltyCoins >= systemConfig?.tenantConfig?.requiredCoinsToRedeem
    ) {
      return systemConfig?.tenantConfig?.loyaltyCoinConversionRate;
    }
    return 0;
  };

  useEffect(() => {
    const c = bookings.reduce(
      (bookingsCustomers: string[], booking: GroupBooking) => {
        if (!bookingsCustomers.includes(booking.customer)) {
          bookingsCustomers.push(booking.customer);
        }
        return bookingsCustomers;
      },
      []
    );

    setCustomers(c);
  }, [bookings]);

  return (
    <div className="min-h-[600px] w-full rounded-[20px]  border-2 border-primary p-5 pb-0">
      <div className="max-[355px] mx-auto">
        <BannerSwiper />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <SubHeading title={systemConfig?.tenantConfig.name ?? ''} />
      </div>

      <p className="block text-[12px] font-semibold leading-normal text-txt-color">
        {systemConfig?.tenantConfig.shopAddress ?? ''}
      </p>

      <div>
        {!_.isEmpty(appointmentTime) && dayjs(appointmentTime) && (
          <div className="my-5">
            <div className="flex items-center">
              <CalendarIcon />
              <span className="mx-4 block text-[12px] font-semibold leading-normal text-txt-color">
                {dayjs(appointmentTime).format('dddd, DD MMM')}
              </span>
            </div>
            <div className="mt-3 flex items-center">
              <Clock5Icon />
              <span className="mx-4 block text-[12px] font-semibold leading-normal text-txt-color">
                {dayjs(appointmentTime).format('hh:mm A')}
              </span>
            </div>
          </div>
        )}
      </div>

      {systemConfig?.tenantConfig?.enableLoyaltyProgram && (
        <div className="mt-[30px] border-t-2 border-primary py-[15px]">
          <div className="py-[3px]">
            <span className="block text-[16px] font-bold leading-normal text-heading-color">
              Loyalty Coins
            </span>
          </div>
          <span className="block text-[12px] font-semibold leading-normal text-heading-color">
            Loyalty Coins Conversion Rate :{' '}
            {systemConfig?.tenantConfig?.loyaltyCoinConversionRate || 0}
          </span>
          <span className="block text-[12px] font-semibold leading-normal text-heading-color">
            Minimum Coins to Redeem :{' '}
            {systemConfig?.tenantConfig?.requiredCoinsToRedeem}
          </span>
          <span className="block text-[12px] font-semibold leading-normal text-heading-color">
            {`${user?.firstName || ''} ${user?.lastName || ''}`} Coins :{' '}
            {user?.loyaltyCoins || 0}
          </span>
        </div>
      )}

      {customers?.map((customer, j) => (
        <div key={j} className="mt-3">
          {j > 0 && <hr />}
          <h1 className="mt-4"> {customer}</h1>
          {bookings
            .filter((x) => x.customer === customer)
            .map((b: GroupBooking, i) => (
              <div className="my-[10px] flex justify-between" key={i}>
                <div className="py-[10px]">
                  <span className="block text-[12px] font-semibold leading-normal text-heading-color">
                    {b.service.name}
                  </span>
                  <span className="block text-[12px] font-semibold leading-normal text-txt-color">
                    {b.service ? `${b.service.serviceTime} mins with` : ''}{' '}
                    {b.barber
                      ? b.barber.store_employee.name
                      : 'Any Professional'}{' '}
                  </span>
                </div>

                <div className="py-[10px]">
                  <span className="block text-[12px] font-semibold leading-normal text-heading-color">
                    {CURRENCY_SYMBOL} {b.service.price}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ))}

      <div className="mt-[30px] flex justify-between border-t-2 border-primary py-[2px]">
        <div className="py-[10px]">
          <span className="block text-[16px] font-bold leading-normal text-heading-color">
            Sub Total
          </span>
        </div>

        <div className="py-[10px]">
          <span className="block text-[16px] font-bold leading-normal text-heading-color">
            {' '}
            {CURRENCY_SYMBOL}{' '}
            {bookings.reduce(
              (total: number, next: GroupBooking) =>
                total + _.toNumber(next.service.price),
              0
            )}{' '}
          </span>
        </div>
      </div>

      {systemConfig?.tenantConfig?.enableLoyaltyProgram && (
        <div className="flex justify-between">
          <div className="py-[2px]">
            <span className="block text-[16px] font-bold leading-normal text-heading-color">
              Discount
            </span>
          </div>

          <div className="py-[2px]">
            <span className="block text-[16px] font-bold leading-normal text-heading-color">
              {' '}
              {CURRENCY_SYMBOL}{' '}
              {(bookings.reduce(
                (total: number, next: GroupBooking) =>
                  total + _.toNumber(next.service.price),
                0
              ) > 0 &&
                user?.loyaltyCoins >=
                  (systemConfig?.tenantConfig?.requiredCoinsToRedeem || 0) &&
                systemConfig?.tenantConfig?.loyaltyCoinConversionRate) ||
                0}
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <div className="py-[2px]">
          <span className="block text-[16px] font-bold leading-normal text-heading-color">
            Grand Total
          </span>
        </div>

        <div className="py-[2px]">
          <span className="block text-[16px] font-bold leading-normal text-heading-color">
            <span className="text-[12px] font-normal leading-normal text-heading-color">
              ( Price exclusive of Tax )
            </span>{' '}
            {CURRENCY_SYMBOL}{' '}
            {bookings.reduce(
              (total: number, next: GroupBooking) =>
                total + _.toNumber(next.service.price),
              0
            ) - getDiscount()}
          </span>
        </div>
      </div>

      <div className="mt-[30px] flex justify-between py-[15px]">
        <button
          onClick={() => continueAction('')}
          className="w-full rounded-[10px] bg-primary text-[16px] font-semibold leading-normal text-white"
        >
          Continue
          {/* {modalOpen && <PaymentModal />} */}
        </button>
      </div>
    </div>
  );
};

export default memo(GroupBookingRightSideBar);
