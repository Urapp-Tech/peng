/* eslint-disable import/no-cycle */
import { configureStore } from '@reduxjs/toolkit';
import appStateReducer from './features/appStateSlice';
import authStateReducer from './features/authStateSlice';
import StoreCategoryStateReducer from './features/storeCategorySlice';
import StoreCategoryItemStateReducer from './features/storeCategoryItemsSlice';
import deviceStateReducer from './features/deviceState';
import { ratingAPI } from './features/ratingSliceAPI';
import { orderAPI } from './features/orderStateSliceAPI';
import AppointmentSliceReducer from './features/appointmentSlice';
import employeeRatingSliceReducer from './features/employeeRatingSlice';

export const store = configureStore({
  reducer: {
    appState: appStateReducer,
    authState: authStateReducer,
    deviceStates: deviceStateReducer,
    storeCategoryState: StoreCategoryStateReducer,
    storeCategoryItemState: StoreCategoryItemStateReducer,
    appointmentState: AppointmentSliceReducer,
    employeeRatingState: employeeRatingSliceReducer,
    [ratingAPI.reducerPath]: ratingAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      orderAPI.middleware,
      ratingAPI.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
