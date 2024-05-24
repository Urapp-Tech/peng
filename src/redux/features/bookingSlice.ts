import { Barber } from '@/interfaces/barber';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Booking = {
  service: StoreService;
  barber?: Barber;
};

type InitialState = {
  bookings: Booking[];
  appointmentTime?: string;
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = LocalStorageUtil.getItem<InitialState>(
  'BOOKINGS'
) || {
  bookings: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const bookingSlice = createSlice({
  name: 'bookingState',
  initialState,
  reducers: {
    clearBookings: (state) => {
      LocalStorageUtil.removeItem('BOOKINGS');
      state.appointmentTime = undefined;
      state.bookings = [];
    },
    addService: (state, action: PayloadAction<StoreService>) => {
      const s = state.bookings.find((x) => x.service.id === action.payload.id);
      if (!s) {
        state.bookings.push({ service: action.payload });
      }
      LocalStorageUtil.setItem('BOOKINGS', state);
    },
    removeService: (state, action: PayloadAction<StoreService>) => {
      state.bookings = state.bookings.filter(
        (x) => x.service.id !== action.payload.id
      );
      LocalStorageUtil.setItem('BOOKINGS', state);
    },
    addBarberOnSpecificService: (
      state,
      action: PayloadAction<{ service: StoreService; barber: Barber }>
    ) => {
      state.bookings = state.bookings.map((x) => {
        if (action.payload.service.id === x.service.id) {
          x.barber = action.payload.barber;
        }
        return x;
      });

      LocalStorageUtil.setItem('BOOKINGS', state);
    },
    addAnyBarberOnSpecificService: (
      state,
      action: PayloadAction<{ service: StoreService }>
    ) => {
      state.bookings = state.bookings.map((x) => {
        if (action.payload.service.id === x.service.id) {
          x.barber = undefined;
        }
        return x;
      });

      LocalStorageUtil.setItem('BOOKINGS', state);
    },
    addBarberToAll: (state, action: PayloadAction<Barber>) => {
      state.bookings = state.bookings.map((x) => {
        x.barber = action.payload;
        return x;
      });
      LocalStorageUtil.setItem('BOOKINGS', state);
    },
    removeBarberFromAll: (state) => {
      state.bookings = state.bookings.map((x) => {
        x.barber = undefined;
        return x;
      });
      LocalStorageUtil.setItem('BOOKINGS', state);
    },
    setAppointmentTime: (state, action: PayloadAction<string>) => {
      state.appointmentTime = action.payload;
    },
  },
});

export const {
  addService,
  removeService,
  addBarberToAll,
  removeBarberFromAll,
  addAnyBarberOnSpecificService,
  addBarberOnSpecificService,
  setAppointmentTime,
  clearBookings,
} = bookingSlice.actions;

export default bookingSlice.reducer;
