import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import AppointmentSliceReducer from './features/appointmentSlice';
import authStateReducer from './features/authStateSlice';
import barberSliceReducer from './features/barberSlice';
import bookingSliceReducer from './features/bookingSlice';
import deviceStateReducer from './features/deviceState';
import employeeRatingSliceReducer from './features/employeeRatingSlice';
import forgotPasswordSliceReducer from './features/forgotPasswordSlice';
import groupBookingSliceReducer from './features/groupBookingSlice';
import { orderAPI } from './features/orderStateSliceAPI';
import { ratingAPI } from './features/ratingSliceAPI';
import StoreCategoryItemStateReducer from './features/storeCategoryItemsSlice';
import StoreCategoryStateReducer from './features/storeCategorySlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    storeCategoryState: StoreCategoryStateReducer,
    storeCategoryItemState: StoreCategoryItemStateReducer,
    appointmentState: AppointmentSliceReducer,
    employeeRatingState: employeeRatingSliceReducer,
    bookingState: bookingSliceReducer,
    barberState: barberSliceReducer,
    groupBookingState: groupBookingSliceReducer,
    forgotPasswordState: forgotPasswordSliceReducer,
    [ratingAPI.reducerPath]: ratingAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderAPI.middleware, ratingAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
