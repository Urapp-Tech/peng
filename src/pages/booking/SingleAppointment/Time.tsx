/* eslint-disable @typescript-eslint/no-loop-func */
import axiosInstance from '@/api/axiosInstance';
import DateCarousel from '@/components/common/DateCarousel';
import Loader from '@/components/common/Loader';
import ProfessionalButton from '@/components/common/buttons/ProfessionalButton';
import TimeSlotsBtn from '@/components/common/buttons/TimeSlotsBtn';
import MainHeading from '@/components/common/typography/MainHeading';
import { Appointment } from '@/interfaces/app.appointment';
import { StoreEmployeeSchedule } from '@/interfaces/barber';
import { fetchAppointments } from '@/redux/features/appointmentSlice';
import { Booking } from '@/redux/features/bookingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import dayjs, { Dayjs } from 'dayjs';
import MinMax from 'dayjs/plugin/minMax';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

dayjs.extend(MinMax);

type QueryParams = {
  tenant: string | undefined;
  startDate?: string | null;
  endDate?: string | null;
  page?: string | null | any;
  size?: string | null | any;
  search?: string | null;
  status?: string | null;
  app_user?: string | null;
};

const Time = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [disabledDates] = useState<(string | Dayjs | Date)[]>([]);
  const { bookings, appointmentTime } = useAppSelector((s) => s.bookingState);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledDays, setDisabledDays] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<Dayjs[]>([]);
  const dispatch = useAppDispatch();
  const allDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const navigate = useNavigate();
  const { user } = useAppSelector((x) => x.authState);
  const { appointments } = useAppSelector((x) => x.appointmentState);
  const { systemConfig } = useAppSelector((x) => x.appState);

  const fetchAppointmentsData = () => {
    const startDate = selectedDate;

    const queryParams: QueryParams = {
      tenant: systemConfig?.tenant,
    };

    if (startDate) {
      queryParams.endDate = startDate;
      queryParams.startDate = startDate;
    }

    dispatch(fetchAppointments(queryParams));
  };

  const shopEvents = async () => {
    try {
      const storeEmployees = bookings.reduce(
        (barbersIds: string[], next: Booking) => {
          if (next.barber) {
            barbersIds.push(next.barber.store_employee.id);
          }
          return barbersIds;
        },
        []
      );
      const resp = await axiosInstance.post(
        `/app/appointment/leave/multi-employees/management/${selectedDate}`,
        { employeeId: storeEmployees }
      );
      return resp.data && resp.data?.data;
    } catch (error) {
      console.error('Error:', error);
      // Handle error if necessary
      return false; // or throw error if you want to propagate it
    }
  };

  const getUserBookedSlotsByDate = async () => {
    try {
      const response = await axiosInstance.get(
        `app/appointment/users/${selectedDate}`
      );
      if (response.data && response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      console.log('getUserBookedSlotsByDate ~ error:', error);
      return [];
    }
  };

  const fetchBarbersAppointment = async (): Promise<Appointment[]> => {
    const storeEmployees = bookings.reduce(
      (barbersIds: string[], next: Booking) => {
        if (next.barber) {
          barbersIds.push(next.barber.store_employee.id);
        }
        return barbersIds;
      },
      []
    );

    const response = await axiosInstance.post(
      `/app/store/appointment/barbers/appointments`,
      { storeEmployees, linedUpDate: selectedDate }
    );

    if (response.status === 200) {
      const data = response.data;
      if (data && data.success && data.data) {
        return data.data;
      }
    }
    return [];
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    console.log('Selected Date:', date);
  };

  useEffect(() => {
    const unavailableDays = new Set<string>();

    bookings.forEach((booking: Booking) => {
      if (booking.barber) {
        const schedule = booking.barber.store_employee_schedule;
        if (schedule) {
          const barberDays = schedule.reduce(
            (prev: Array<string>, next: StoreEmployeeSchedule) => {
              prev.push(next.work_day);
              return prev;
            },
            []
          );

          const offDays = allDays.filter((day) => !barberDays.includes(day));
          offDays.forEach((day) => unavailableDays.add(day));
        }
      }
    });

    if (
      systemConfig?.tenantConfig.shopSchedule &&
      systemConfig?.tenantConfig.shopSchedule.length > 0
    ) {
      const offDays = allDays.filter(
        (day) =>
          systemConfig?.tenantConfig.shopSchedule.filter((x) => x.day === day)
            .length === 0
      );
      offDays.forEach((day) => unavailableDays.add(day));
    }

    setDisabledDays(Array.from(unavailableDays));
  }, [bookings]);

  const generateAvailableTimeSlots = async () => {
    if (!selectedDate) return false;
    let anyProfessionIncluded = false;

    if (
      bookings.filter((x) => _.isUndefined(x.barber)).length === bookings.length
    ) {
      anyProfessionIncluded = true;
    }

    setLoading(true);

    const promises = [];
    promises.push(shopEvents());

    if (!_.isEmpty(user)) {
      promises.push(getUserBookedSlotsByDate());
    }

    promises.push(fetchBarbersAppointment());

    const [dayAvailable, userBookedAppointment, barberBookedAppointment] =
      await Promise.all(promises);

    if (dayAvailable) {
      setTimeSlots([]);
      setLoading(false);
      return false;
    }

    const bookedAppointments = (barberBookedAppointment || []).concat(
      (userBookedAppointment || []).concat(appointments)
    );

    setLoading(false);

    const dayName = dayjs(selectedDate).format('dddd');
    const workingSchedules: StoreEmployeeSchedule[] = [];

    bookings.forEach((booking: Booking) => {
      if (booking.barber) {
        const schedule = booking.barber.store_employee_schedule;
        if (schedule) {
          schedule.forEach((scheduleItem: StoreEmployeeSchedule) => {
            if (scheduleItem.work_day === dayName && scheduleItem.is_active) {
              workingSchedules.push(scheduleItem);
            }
          });
        }
      }
    });

    if (workingSchedules.length === 0 && !anyProfessionIncluded) {
      setTimeSlots([]);
      return false;
    }

    const startTimes = workingSchedules.map((schedule) =>
      dayjs(`${selectedDate} ${dayjs(schedule.start_time).format('HH:mm:ss')}`)
    );
    const endTimes = workingSchedules.map((schedule) =>
      dayjs(`${selectedDate} ${dayjs(schedule.end_time).format('HH:mm:ss')}`)
    );

    const maxStartTime = anyProfessionIncluded
      ? dayjs(
          `${selectedDate} ${dayjs(systemConfig?.tenantConfig.officeTimeIn).format('HH:mm:ss')}`
        )
      : dayjs.max(startTimes);
    const minEndTime = anyProfessionIncluded
      ? dayjs(
          `${selectedDate} ${dayjs(systemConfig?.tenantConfig.officeTimeOut).format('HH:mm:ss')}`
        )
      : dayjs.min(endTimes);

    const barberServiceTime: number[] = bookings.reduce(
      (st: number[], next: Booking) => {
        next.barber &&
          st.push(_.toNumber(next.service?.serviceTime ?? '15') ?? 15);
        return st;
      },
      [0]
    );

    let barberMaxServiceTime: number = Math.max(...barberServiceTime);

    if (barberMaxServiceTime === 0) {
      barberMaxServiceTime = 15;
    }

    const bookedSlotsEndTimes = bookedAppointments.map(
      (appointment: Appointment) => {
        return {
          start: dayjs(appointment.appointmentTime).subtract(
            barberMaxServiceTime,
            'minutes'
          ),
          end: dayjs(appointment.appointmentTime).add(
            _.toNumber(appointment.serviceTime) ?? 0,
            'minutes'
          ),
        };
      }
    );

    const availableSlots: Dayjs[] = [];
    let currentSlot = maxStartTime;

    while (currentSlot && currentSlot.isBefore(minEndTime)) {
      const slotEnd = currentSlot.add(barberMaxServiceTime, 'minute');
      let slotAvailable = true;

      bookedSlotsEndTimes.forEach((b: { start: Dayjs; end: Dayjs }) => {
        if (
          currentSlot &&
          currentSlot.isBefore(b.end) &&
          slotEnd.isAfter(b.start)
        ) {
          slotAvailable = false;
        }
      });

      if (slotAvailable) {
        availableSlots.push(currentSlot);
      }

      currentSlot = slotEnd;
    }

    setTimeSlots(availableSlots);

    return true;
  };

  useEffect(() => {
    if (
      bookings.filter((x) => _.isUndefined(x.barber)).length ===
        bookings.length &&
      selectedDate
    ) {
      fetchAppointmentsData();
    } else {
      generateAvailableTimeSlots();
    }
  }, [selectedDate, bookings]);

  useEffect(() => {
    generateAvailableTimeSlots();
  }, [appointments]);

  const handleProfessionalButtonClick = () => {
    if (
      bookings.filter((x) => _.isUndefined(x.barber)).length !== bookings.length
    ) {
      navigate('/booking/appointment/professionals-by-service');
    }
  };

  return (
    <div className="px-[20px] max-lg:px-0">
      {loading && <Loader />}
      <MainHeading title="Select Date & Time" />
      <ProfessionalButton
        barber={bookings[0]?.barber}
        onclick={handleProfessionalButtonClick}
      />
      <DateCarousel
        onDateSelect={handleDateSelect}
        disabledDates={disabledDates}
        disabledDays={disabledDays}
      />
      <div className="my-[15px] max-h-[400px] overflow-x-hidden overflow-y-scroll p-[15px] shadow-md">
        {timeSlots.map((slot, index) => (
          <TimeSlotsBtn
            key={index}
            time={slot}
            active={slot.isSame(appointmentTime)}
          />
        ))}
      </div>
    </div>
  );
};

export default Time;
