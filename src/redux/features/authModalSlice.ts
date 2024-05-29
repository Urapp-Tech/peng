import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
  loginModal: boolean;
  GuestLoginModal: boolean;
  registerModal: boolean;
  registerOtpModal: boolean;
  registerOtpEmail: string;
};

const initialState: InitialState = {
  loginModal: false,
  GuestLoginModal: false,
  registerModal: false,
  registerOtpModal: false,
  registerOtpEmail: '',
};

export const authModalSlice = createSlice({
  name: 'authModalState',
  initialState,
  reducers: {
    handleShowLoginModal: (state, action: PayloadAction<boolean>) => {
      state.loginModal = action.payload;
    },
    handleShowGuestLoginModal: (state, action: PayloadAction<boolean>) => {
      state.GuestLoginModal = action.payload;
    },
    handleShowRegisterModal: (state, action: PayloadAction<boolean>) => {
      state.registerModal = action.payload;
    },
    showRegisterOtpModal: (state, action: PayloadAction<boolean>) => {
      state.registerOtpModal = action.payload;
    },
    setRegisterOtpEmail: (state, action: PayloadAction<string>) => {
      state.registerOtpEmail = action.payload;
    },
  },
});

export const {
  handleShowLoginModal,
  handleShowGuestLoginModal,
  handleShowRegisterModal,
  showRegisterOtpModal,
  setRegisterOtpEmail,
} = authModalSlice.actions;

export default authModalSlice.reducer;
