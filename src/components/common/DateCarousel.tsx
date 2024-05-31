import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from '../ui/button';
import DateBtn from './buttons/DateBtn';

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);

const FORMAT_YEAR_MONTH_DAY = 'YYYY-MM-DD';

interface Day {
  dayOfWeek: string;
  dayOfMonth: string;
  day: string;
  month: string;
  year: string;
  unix: number;
  class: string;
  date: Dayjs;
  disabled: boolean;
}

interface DateCarouselProps {
  _useEthiopianCalendar?: boolean;
  onDateSelect?: (date: string) => void;
  disabledDates?: (string | Dayjs | Date)[];
  disabledDays?: string[];
}

const DateCarousel: React.FC<DateCarouselProps> = ({
  onDateSelect,
  disabledDates = [],
  disabledDays = [],
}) => {
  const sliderRef = useRef<any>(null);
  const [days, setDays] = useState<Day[]>([]);
  const [prevDisabled, setPrevDisabled] = useState<boolean>(false);
  const [endDisabled, setEndDisabled] = useState<boolean>(false);
  const [monthInView, setMonthInView] = useState<Dayjs>(
    dayjs().startOf('month')
  );
  const [datePicked, setDatePicked] = useState<string>('');
  const [headerText, setHeaderText] = useState<string>('');

  useEffect(() => {
    const now = dayjs();
    setMonthInView(now.startOf('month'));
    calculateDays(now.startOf('month'), (availableDate) => {
      setDatePicked(availableDate);
      onDateSelect && onDateSelect(availableDate);
    });
  }, [disabledDays, disabledDates]);

  const parseDisabledDates = (dates: (string | Dayjs | Date)[]) => {
    return dates.map((date) => dayjs(date).format(FORMAT_YEAR_MONTH_DAY));
  };

  const disabledDatesParsed = parseDisabledDates(disabledDates);

  const calculateHeaderText = (paramMonthInView: Dayjs) => {
    return `${paramMonthInView.format('MMMM YYYY')}`;
  };

  const calculateDays = (
    paramMonthInView: Dayjs,
    setFirstAvailableDate?: (date: string) => void
  ) => {
    const tempDays: Day[] = [];
    let currentDay = paramMonthInView.startOf('month');
    const today = dayjs().startOf('day');
    let firstAvailableDate: string | null = null;

    setHeaderText(calculateHeaderText(paramMonthInView));

    while (currentDay.month() === paramMonthInView.month()) {
      const formattedDate = currentDay.format(FORMAT_YEAR_MONTH_DAY);
      const dayOfWeek = currentDay.format('dddd');
      const isPastDate = currentDay.isBefore(today);

      const disabled =
        isPastDate ||
        disabledDatesParsed.includes(formattedDate) ||
        disabledDays.includes(dayOfWeek);
      if (!disabled && !firstAvailableDate) {
        firstAvailableDate = formattedDate;
      }

      tempDays.push({
        dayOfWeek: currentDay.format('ddd'),
        dayOfMonth: currentDay.format('D'),
        day: currentDay.format('DD'),
        month: currentDay.format('MM'),
        year: currentDay.format('YYYY'),
        unix: currentDay.unix(),
        class: datePicked === formattedDate ? 'selected' : '',
        date: currentDay,
        disabled,
      });

      currentDay = currentDay.add(1, 'day');
    }

    setDays(tempDays);

    if (setFirstAvailableDate && firstAvailableDate) {
      setFirstAvailableDate(firstAvailableDate);
    }
  };

  const handlePrevMonth = () => {
    const newMonthInView = monthInView.subtract(1, 'month');
    setMonthInView(newMonthInView);
    calculateDays(newMonthInView);
  };

  const handleNextMonth = () => {
    const newMonthInView = monthInView.add(1, 'month');
    setMonthInView(newMonthInView);
    calculateDays(newMonthInView);
  };

  const handleDayPick = (day: string, month: string, year: string) => {
    const selectedDate = `${year}-${month}-${day}`;
    const dayOfWeek = dayjs(selectedDate).format('dddd');

    if (
      !disabledDatesParsed.includes(selectedDate) &&
      !disabledDays.includes(dayOfWeek)
    ) {
      setDatePicked(selectedDate);
      calculateDays(monthInView);
      if (onDateSelect) {
        onDateSelect(selectedDate);
      }
    }
  };

  const detectCButtonActiveStatus = () => {
    if (sliderRef.current && sliderRef.current.swiper) {
      if (sliderRef.current.swiper.isBeginning) {
        setPrevDisabled(true);
      } else {
        setPrevDisabled(false);
      }
      if (sliderRef.current.swiper.isEnd) {
        setEndDisabled(true);
      } else {
        setEndDisabled(false);
      }
    }
  };

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
    detectCButtonActiveStatus();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
    detectCButtonActiveStatus();
  }, []);

  return (
    <div className="shadecn mt-5">
      <div>
        <span className="flex items-center text-left text-[16px] font-bold capitalize leading-normal text-heading-color">
          <Button
            variant="link"
            onClick={handlePrevMonth}
            className="prev-month"
          >
            {' '}
            <ChevronLeft />{' '}
          </Button>
          {headerText}
          <Button
            variant="link"
            onClick={handleNextMonth}
            className="next-month"
          >
            {' '}
            <ChevronRight />{' '}
          </Button>
        </span>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-1 flex items-center">
          <Button
            className=" bg-transparent text-primary hover:bg-transparent"
            aria-label="Previous"
            disabled={prevDisabled}
            onClick={handlePrev}
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="col-span-10">
          <Swiper
            ref={sliderRef}
            modules={[Navigation]}
            slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              400: {
                slidesPerView: 2,
              },
              639: {
                slidesPerView: 3,
              },
              865: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 5,
              },
              1500: {
                slidesPerView: 6,
              },
              1700: {
                slidesPerView: 6,
              },
            }}
            onSliderMove={detectCButtonActiveStatus}
            initialSlide={dayjs().date() - 1}
            className="mySwiper "
          >
            {days.map((day) => (
              <SwiperSlide
                key={day.unix}
                className={`day cursor-pointer ${day.class} ${
                  day.disabled ? 'disabled' : ''
                }`}
              >
                <DateBtn
                  dateTitle={day.dayOfMonth}
                  dayTitle={day.dayOfWeek}
                  onclick={() =>
                    !day.disabled && handleDayPick(day.day, day.month, day.year)
                  }
                  active={day?.date?.isSame(datePicked)}
                  disabled={day.disabled}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="col-span-1 flex items-center">
          <Button
            className=" bg-transparent text-primary hover:bg-transparent"
            aria-label="Next"
            disabled={endDisabled}
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DateCarousel;
