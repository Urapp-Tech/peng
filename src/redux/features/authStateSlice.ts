import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setToken } from '../../utils/constant';
import LocalStorageUtil from '../../utils/LocalStorageUtil';

type RegisteredUser = {
  id: string;
  email: string;
  isActive: boolean;
  createdDate: string;
  updatedDate: string;
  tenant: string;
  phone: string;
  firstName: string;
  lastName: string;
  postalCode: string;
  userType: string;
  token: string;
};

type AuthState = {
  user: RegisteredUser | null;
};

const storedUser = LocalStorageUtil.getItem<any>('USER');
setToken(storedUser?.token || null);

const initialState: AuthState = {
  user: storedUser,
};

export const authStateSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<RegisteredUser>) => {
      state.user = action.payload;
      LocalStorageUtil.setItem('USER', action.payload);
      setToken(action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      setToken('');
      LocalStorageUtil.removeItem('ORDER_ITEM');
      LocalStorageUtil.removeItem('USER');
      LocalStorageUtil.removeItem('REGISTERED_CART');
      LocalStorageUtil.removeItem('CART_ITEMS');
    },
  },
});

export const { login, logout } = authStateSlice.actions;
export default authStateSlice.reducer;
