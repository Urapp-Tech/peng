import axiosInstance from '@/api/axiosInstance';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoreService } from '../../interfaces/serviceCategory.interface';

type InitialState = {
  categoryItems: StoreService[];
  selectedCategoryItems?: StoreService;
  ShortCategoryItems: { id: string; name: string }[];
  loading: boolean;
  notify: boolean;
  notifyMessage: { text?: string; type?: string };
};

const initialState: InitialState = {
  categoryItems: [],
  ShortCategoryItems: [],
  loading: false,
  notify: false,
  notifyMessage: {},
};

export const fetchCategoriesItems = createAsyncThunk(
  'store/fetchCategoriesItems',
  async (
    data: {
      branch: any | undefined;
      tenant: string | undefined;
      categoryId: string;
      search: string | undefined;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `/app/categories/items/list/${data.tenant}/${data.branch}`,
        {
          params: {
            search: data.search,
            categoryId: data.categoryId,
            page: 0,
            size: 500,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const storeCategoryItemsSlice = createSlice({
  name: 'storeCategoryItemsSlice',
  initialState,
  reducers: {
    setCategoriesItem: (state, action: PayloadAction<StoreService[]>) => {
      state.categoryItems = action.payload;
    },
    setSelectedCategoriesItem: (state, action: PayloadAction<StoreService>) => {
      state.selectedCategoryItems = action.payload;
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
      .addCase(fetchCategoriesItems.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchCategoriesItems.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryItems = action.payload.data.list || [];
      })
      .addCase(fetchCategoriesItems.rejected, (state, action: any) => {
        state.loading = false;
        if (action?.payload?.error) {
          state.notifyMessage = {
            text: `Something went wrong. Error: ${action.payload.error} `,
            type: 'error',
          };
        }
      });
  },
});

export const {
  setCategoriesItem,
  setNotifyState,
  showNotifyMessage,
  setSelectedCategoriesItem,
} = storeCategoryItemsSlice.actions;

export default storeCategoryItemsSlice.reducer;
