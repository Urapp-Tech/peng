import axiosInstance from "@/api/axiosInstance";
import { Barber } from "@/interfaces/barber";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  barbers: Barber[];
  loading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  barbers: [],
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchCBarber = createAsyncThunk(
  "store/fetchBarber",
  async (storeServiceCategoryItems: Array<string> , { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/app/store/appointment/barbers`,
        {storeServiceCategoryItems}
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(JSON.stringify(error));
    }
  }
);

const barberSlice = createSlice({
  name: "barberState",
  initialState,
  reducers: {
    setBarbersEmpty: (state ) => {
      state.barbers = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCBarber.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCBarber.fulfilled, (state, action) => {
      state.barbers = action.payload.data || [];
      state.loading = false;
    });
    builder.addCase(fetchCBarber.rejected, (state, action:any) => {
      state.loading = false;
      state.barbers = [];
      state.notify = true;
      action = JSON.parse(action.payload);
      if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error.message} `,
            type: "error",
          };
      }
    });
  },
});

export const { setBarbersEmpty } = barberSlice.actions;

export default barberSlice.reducer;
