import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Branch } from '@/interfaces/branch';
import LocalStorageUtil from '@/utils/LocalStorageUtil';

type InitialState = {
  branches: Branch[];
  selectedBranch?: Branch;
  loading: boolean;
  notify: boolean;
  total_count: number;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  branches: [],
  selectedBranch: LocalStorageUtil.getItem('BRANCH') ?? undefined,
  total_count: 0,
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchBranch = createAsyncThunk(
  'branch/fetchBranch',
  async (
    data: {
      tenant: string | any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/branch/list/${data.tenant}`,
        { params: data }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const branchSlice = createSlice({
  name: 'branchSlice',
  initialState,
  reducers: {
    setBranches: (state, action: PayloadAction<Branch[]>) => {
      state.branches = action.payload;
    },
    setBranch: (state, action: PayloadAction<Branch>) => {
      state.selectedBranch = action.payload;
      LocalStorageUtil.setItem('BRANCH', action.payload);
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
      .addCase(fetchBranch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload?.data.list || [];
        state.total_count =
          action.payload?.data?.total || action.payload?.data.list?.length || 0;
      })
      .addCase(fetchBranch.rejected, (state, action: any) => {
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

export const { setBranches, setNotifyState, showNotifyMessage, setBranch } =
  branchSlice.actions;

export default branchSlice.reducer;
