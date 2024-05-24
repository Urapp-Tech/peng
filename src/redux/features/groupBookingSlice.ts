import { Barber } from '@/interfaces/barber';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import LocalStorageUtil from '@/utils/LocalStorageUtil';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GroupBooking = {
  service: StoreService;
  barber?: Barber;
  customer: string;
};

type InitialState = {
  bookings: GroupBooking[];
  appointmentTime?: string;
  selectedCustomer?: string;
  mainCustomer?: string;
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = LocalStorageUtil.getItem<InitialState>(
  'GROUP_BOOKINGS'
) || {
  bookings: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const groupBookingSlice = createSlice({
  name: 'groupBookingState',
  initialState,
  reducers: {
    setSelectedCustomer: (state, action: PayloadAction<string>) => {
      state.selectedCustomer = action.payload;
    },
    setMainCustomer: (state, action: PayloadAction<string>) => {
      state.mainCustomer = action.payload;
    },
    clearBookings: (state) => {
      LocalStorageUtil.removeItem('GROUP_BOOKINGS');
      state.appointmentTime = undefined;
      state.bookings = [];
      state.mainCustomer = undefined;
      state.selectedCustomer = undefined;
    },
    addService: (state, action: PayloadAction<StoreService>) => {
      const s = state.bookings.find(
        (x) =>
          x.service.id === action.payload.id &&
          x.customer === (state.selectedCustomer || 'Me')
      );
      if (!s) {
        state.bookings.push({
          service: action.payload,
          customer: state.selectedCustomer || 'Me',
        });
      }
      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
    },
    removeService: (state, action: PayloadAction<StoreService>) => {
      state.bookings = state.bookings.filter(
        (x) =>
          x.service.id !== action.payload.id &&
          x.customer === state.selectedCustomer
      );
      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
    },
    removeAllServiceOfCustomer: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(
        (x) => x.customer !== action.payload
      );
      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
    },
    addBarberOnSpecificService: (
      state,
      action: PayloadAction<{ service: StoreService; barber: Barber }>
    ) => {
      state.bookings = state.bookings.map((x) => {
        if (
          action.payload.service.id === x.service.id &&
          x.customer === state.selectedCustomer
        ) {
          x.barber = action.payload.barber;
        }
        return x;
      });

      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
    },
    addAnyBarberOnSpecificService: (
      state,
      action: PayloadAction<{ service: StoreService }>
    ) => {
      state.bookings = state.bookings.map((x) => {
        if (
          action.payload.service.id === x.service.id &&
          x.customer === state.selectedCustomer
        ) {
          x.barber = undefined;
        }
        return x;
      });

      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
    },
    addBarberToAll: (state, action: PayloadAction<Barber>) => {
      state.bookings = state.bookings.map((x) => {
        x.barber = action.payload;
        return x;
      });
      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
    },
    removeBarberFromAll: (state) => {
      state.bookings = state.bookings.map((x) => {
        x.barber = undefined;
        return x;
      });
      LocalStorageUtil.setItem('GROUP_BOOKINGS', state);
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
  setSelectedCustomer,
  setMainCustomer,
  removeAllServiceOfCustomer,
} = groupBookingSlice.actions;

export default groupBookingSlice.reducer;
