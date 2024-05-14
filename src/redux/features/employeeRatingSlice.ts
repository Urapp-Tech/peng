import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EmployeeRatingData } from '../../interfaces/employee-ratings';
import axiosInstance from '@/api/axiosInstance';

type InitialState = {
  employeeRatings: EmployeeRatingData[];
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  employeeRatings: [],
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchEmployeeRatingSlice = createAsyncThunk(
  'EmployeeRating/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/app/store/appointment-ratings/list`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const updateEmployeeRatingSlice = createAsyncThunk(
  'EmployeeRating/update',
  async (
    data: { id: string; status: string; review: string; star: number },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const response = await axiosInstance.patch(`/app/store/appointment-ratings/update/${data.id}`,data);
      return fulfillWithValue({ id: data.id, ...response.data });
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const employeeRatingSlice = createSlice({
  name: 'employeeRatingSlice',
  initialState,
  reducers: {
    setRatings: (state, action: PayloadAction<EmployeeRatingData[]>) => {
      state.employeeRatings = action.payload;
    },
    setNotifyState: (state, action: PayloadAction<boolean>) => {
      state.notify = action.payload;
    },
    showNotifyMessage: (state, action: PayloadAction<any>) => {
      state.notifyMessage = action.payload;
      state.notify = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployeeRatingSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployeeRatingSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.employeeRatings = action.payload?.data || [];
        state.total_count =
          action.payload?.data?.totalCount || action.payload?.data?.length || 0;
      })
      .addCase(fetchEmployeeRatingSlice.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      })
      .addCase(updateEmployeeRatingSlice.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployeeRatingSlice.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.id) {
          state.employeeRatings = state.employeeRatings.filter(
            (x) => x.id !== action.payload.id
          );
        }
      })
      .addCase(updateEmployeeRatingSlice.rejected, (state, action: any) => {
        state.loading = false;
        if (action.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.error.message}`,
            type: 'error',
          };
          state.notify = true;
        }
      });
  },
});

export const { setRatings, setNotifyState, showNotifyMessage } =
  employeeRatingSlice.actions;

export default employeeRatingSlice.reducer;
