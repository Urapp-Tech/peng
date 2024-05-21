import React, { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import DateBtn from "./buttons/DateBtn";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);

const FORMAT_YEAR_MONTH_DAY = "YYYY-MM-DD";

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
  const [days, setDays] = useState<Day[]>([]);
  const [monthInView, setMonthInView] = useState<Dayjs>(dayjs().startOf("month"));
  const [datePicked, setDatePicked] = useState<string>("");
  const [headerText, setHeaderText] = useState<string>("");

  useEffect(() => {
    const now = dayjs();
    setMonthInView(now.startOf("month"));
    calculateDays(now.startOf("month"), (availableDate) => {
      setDatePicked(availableDate);
      onDateSelect && onDateSelect(availableDate);
    });
  }, [disabledDays, disabledDates]);

  const parseDisabledDates = (dates: (string | Dayjs | Date)[]) => {
    return dates.map((date) => dayjs(date).format(FORMAT_YEAR_MONTH_DAY));
  };

  const disabledDatesParsed = parseDisabledDates(disabledDates);

  const calculateHeaderText = (monthInView: Dayjs) => {
    return `${monthInView.format("MMMM YYYY")}`;
  };

  const calculateDays = (monthInView: Dayjs, setFirstAvailableDate?: (date: string) => void) => {
    let days: Day[] = [];
    let currentDay = monthInView.startOf("month");
    const today = dayjs().startOf('day');
    let firstAvailableDate: string | null = null;

    setHeaderText(calculateHeaderText(monthInView));

    while (currentDay.month() === monthInView.month()) {
      const formattedDate = currentDay.format(FORMAT_YEAR_MONTH_DAY);
      const dayOfWeek = currentDay.format("dddd");
      const isPastDate = currentDay.isBefore(today);

      const disabled = isPastDate || disabledDatesParsed.includes(formattedDate) || disabledDays.includes(dayOfWeek);
      if (!disabled && !firstAvailableDate) {
        firstAvailableDate = formattedDate;
      }

      days.push({
        dayOfWeek: currentDay.format("ddd"),
        dayOfMonth: currentDay.format("D"),
        day: currentDay.format("DD"),
        month: currentDay.format("MM"),
        year: currentDay.format("YYYY"),
        unix: currentDay.unix(),
        class: datePicked === formattedDate ? "selected" : "",
        date: currentDay,
        disabled: disabled,
      });

      currentDay = currentDay.add(1, "day");
    }

    setDays(days);

    if (setFirstAvailableDate && firstAvailableDate) {
      setFirstAvailableDate(firstAvailableDate);
    }
  };

  const handlePrevMonth = () => {
    const newMonthInView = monthInView.subtract(1, "month");
    setMonthInView(newMonthInView);
    calculateDays(newMonthInView);
  };

  const handleNextMonth = () => {
    const newMonthInView = monthInView.add(1, "month");
    setMonthInView(newMonthInView);
    calculateDays(newMonthInView);
  };

  const handleDayPick = (day: string, month: string, year: string) => {
    const selectedDate = `${year}-${month}-${day}`;
    const dayOfWeek = dayjs(selectedDate).format("dddd");

    if (!disabledDatesParsed.includes(selectedDate) && !disabledDays.includes(dayOfWeek)) {
      setDatePicked(selectedDate);
      calculateDays(monthInView);
      if (onDateSelect) {
        onDateSelect(selectedDate);
      }
    }
  };

  return (
    <div className="shadecn mt-5">
      <div>
        <span className="flex items-center text-left text-heading-color text-[16px] font-bold leading-normal capitalize">
          <Button
            variant={"link"}
            onClick={handlePrevMonth}
            className="prev-month"
          >
            {" "}
            <ChevronLeft />{" "}
          </Button>
          {headerText}
          <Button
            variant={"link"}
            onClick={handleNextMonth}
            className="next-month"
          >
            {" "}
            <ChevronRight />{" "}
          </Button>
        </span>
      </div>
      <Swiper
        modules={[Navigation]}
        slidesPerView={6}
        initialSlide={dayjs().date() - 1}
        navigation={true}
        className="mySwiper"
      >
        {days.map((day) => (
          <SwiperSlide
            key={day.unix}
            className={`cursor-pointer day ${day.class} ${
              day.disabled ? "disabled" : ""
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
  );
};

export default DateCarousel;
