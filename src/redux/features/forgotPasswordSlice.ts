import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  forgotModal: boolean;
  forgotOtpModal: boolean;
  forgotOtpEmail: string;
};

const initialState: InitialState =  {
  forgotModal: false,
  forgotOtpModal: false,
  forgotOtpEmail: '',
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPasswordState",
  initialState,
  reducers: {
    showForgotModal: (state) => {
      state.forgotModal = true;
    },
    handleShowForgotModal: (state,action: PayloadAction<boolean>) => {
      state.forgotModal = action.payload;
    },
    showForgotOtpModal: (state) => {
      state.forgotOtpModal = true;
    },
    handleShowForgotOtpModal: (state,action: PayloadAction<boolean>) => {
      state.forgotOtpModal = action.payload;
    },
    setOtpEmail: (state,action: PayloadAction<string>) => {
      state.forgotOtpEmail = action.payload;
    },
  },
});

export const {
  showForgotModal,
  handleShowForgotModal,
  showForgotOtpModal,
  handleShowForgotOtpModal,
  setOtpEmail,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
