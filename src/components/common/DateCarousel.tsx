import React, { useState, useEffect, MouseEvent } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DateBtn from './buttons/DateBtn';
import { Button } from '../ui/button';
// import '@shadecn/core/dist/shade.css'; // Assuming ShadeCN styles are imported like this

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
}

interface DateCarouselProps {
  useEthiopianCalendar?: boolean;
}

const DateCarousel: React.FC<DateCarouselProps> = ({ useEthiopianCalendar = false }) => {
  const [days, setDays] = useState<Day[]>([]);
  const [weekInView, setWeekInView] = useState<Dayjs>(dayjs().startOf('isoWeek'));
  const [datePicked, setDatePicked] = useState<string>(dayjs().format(FORMAT_YEAR_MONTH_DAY));
  const [headerText, setHeaderText] = useState<string>('');

  useEffect(() => {
    let now = dayjs();
    if (useEthiopianCalendar) {
      // Handle Ethiopian calendar reconfiguration if needed
    }
    setWeekInView(now.startOf('isoWeek'));
    setDatePicked(now.format(FORMAT_YEAR_MONTH_DAY));
    calculateDays(now.startOf('isoWeek'));
  }, [useEthiopianCalendar]);

  const calculateHeaderText = (weekInView: Dayjs) => {
    let firstDayOfWeek = weekInView;
    let lastDayOfWeek = weekInView.add(6, 'day');

    const firstDayOfWeekYear = firstDayOfWeek.year();
    const lastDayOfWeekYear = lastDayOfWeek.year();

    if (firstDayOfWeekYear !== lastDayOfWeekYear) {
      return `${firstDayOfWeek.format('DD MMM YYYY')} - ${lastDayOfWeek.format('DD MMM YYYY')}`;
    } else {
      return `${firstDayOfWeek.format('DD MMM')} - ${lastDayOfWeek.format('DD MMM YYYY')}`;
    }
  };

  const calculateDays = (weekInView: Dayjs) => {
    let days: Day[] = [];
    let currentDay = weekInView;

    setHeaderText(calculateHeaderText(weekInView));

    for (let i = 0; i < 7; i++) {
      days.push({
        dayOfWeek: currentDay.format('ddd'),
        dayOfMonth: currentDay.format('D'),
        day: currentDay.format('DD'),
        month: currentDay.format('MM'),
        year: currentDay.format('YYYY'),
        unix: currentDay.unix(),
        class: datePicked === currentDay.format(FORMAT_YEAR_MONTH_DAY) ? 'selected' : ''
      });
      currentDay = currentDay.add(1, 'day');
    }
    setDays(days);
  };

  const handleNext = () => {
    const newWeekInView = weekInView.add(1, 'week');
    setWeekInView(newWeekInView);
    setDatePicked(newWeekInView.format(FORMAT_YEAR_MONTH_DAY));
    calculateDays(newWeekInView);
  };

  const handleBack = () => {
    const newWeekInView = weekInView.subtract(1, 'week');
    setWeekInView(newWeekInView);
    setDatePicked(newWeekInView.format(FORMAT_YEAR_MONTH_DAY));
    calculateDays(newWeekInView);
  };

  const handleDayPick = (day: string, month: string, year: string, unix: number) => {
    setDatePicked(`${year}-${month}-${day}`);
    calculateDays(dayjs(`${year}-${month}-${day}`, FORMAT_YEAR_MONTH_DAY).startOf('isoWeek'));
  };

  const handleToday = () => {
    let now = dayjs();
    if (useEthiopianCalendar) {
      // Handle Ethiopian calendar reconfiguration if needed
    }
    setWeekInView(now.startOf('isoWeek'));
    setDatePicked(now.format(FORMAT_YEAR_MONTH_DAY));
    calculateDays(now.startOf('isoWeek'));
  };

  return (
    <div className="shadecn">
      <style>
        {`
          .header, .days {
            width: 100%;
            font-size: 1em;
            color: #000;
            text-align: center;
          }
          .month {
            font-size: 1em;
            color: #000;
          }
          .day-of-week, .day-of-month {
            text-align: center;
          }
          .selected .day-of-month {
            background: #CCC;
            color: #000;
            border-radius: 15px;
          }
          .button {
            white-space: nowrap;
            width: 1px;
          }
          .clickable {
            cursor: pointer;
          }
          .icon-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            border-radius: 50%;
            transition: background 0.3s;
          }
          .icon-button:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
      <table className="header">
        <thead>
          <tr>
            <td>
                <span className="block text-left text-heading-color text-[16px] font-bold leading-normal capitalize">
                    {headerText}
                </span>
            </td>
            <td className="clickable button" onClick={handleToday}>
              <Button className="today">Today</Button>
            </td>
          </tr>
        </thead>
      </table>
      <table className="days">
        <tbody>
          <tr>
            <td className="clickable button" onClick={handleBack}>
              <div className="icon-button">
              <ChevronLeft />

              </div>
            </td>
            {days.map((day) => (
              <td
                key={day.unix}
                className={`clickable day ${day.class}`}
                onClick={() => handleDayPick(day.day, day.month, day.year, day.unix)}
                data-day={day.day}
                data-month={day.month}
                data-year={day.year}
                data-unix={day.unix}
              >
                <DateBtn dateTitle={day.dayOfMonth} dayTitle={day.dayOfWeek} active={day.class == 'selected'  } />
              </td>
            ))}
            <td className="clickable button" onClick={handleNext}>
              <div className="icon-button">
                <ChevronRight />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DateCarousel;
