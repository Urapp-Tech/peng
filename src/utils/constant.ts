import { SignUpPayload } from '../types/auth.types';
import LocalStorageUtil from './LocalStorageUtil';

const HOST = 'https://dev.urapptech.com';
export const MAIN_BASE_URL = `${HOST}/api/v1/app/`;

export const APP_USER_PREFIXES = 'app-user';

let token = '';
export const setToken = (data: string) => {
  token = data;
};
export const getToken = () => {
  return token;
};

let tenantId = '';
export const setTenantId = (data: string) => {
  tenantId = data;
};
export const getTenantId = () => {
  return tenantId;
};

export function getHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: getToken(),
  } as const;
}

export const setSignUpData = (data: SignUpPayload) => {
  LocalStorageUtil.setItem('SIGN_UP_DATA', data);
};

export const ORDER_STATUS = {
  NEW: 'New',
  PROCESSING_ITEM: 'Processing-Item',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
} as const;

export const ORDER_STATUSES = new Map([
  [
    ORDER_STATUS.NEW,
    {
      status: ORDER_STATUS.NEW,
      title: 'Placed Order',
      color: 'text-cyan-500',
      text: 'We have received your order',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 10,
    },
  ],
  [
    ORDER_STATUS.PROCESSING_ITEM,
    {
      status: ORDER_STATUS.PROCESSING_ITEM,
      title: 'Processing Items',
      color: 'text-fuchsia-500',
      text: 'your items are processing',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 60,
    },
  ],
  [
    ORDER_STATUS.COMPLETED,
    {
      status: ORDER_STATUS.COMPLETED,
      title: 'Order Completed',
      color: 'text-amber-500',
      text: 'order has been completed',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
  [
    ORDER_STATUS.CANCELLED,
    {
      status: ORDER_STATUS.CANCELLED,
      title: 'Order Canceled',
      color: 'text-red-500',
      text: 'You have canceled the order',
      iconText: 'CheckCircleOutlineOutlined',
      progress: 100,
    },
  ],
]);

// patterns
export const PATTERN = {
  // CHAR_NUM_DOT_AT: /^[A-Za-z0-9\s.@]+$/,
  CHAR_NUM_DOT_AT: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // used for email fields
  CHAR_SPACE_DASH: /^[A-Za-z\s-]+$/, // used for textfield fields
  CHAR_NUM_SPACE_DASH: /^[A-Za-z0-9\s-]+$/, // used for textfield fields
  ADDRESS_ONLY: /^[A-Za-z0-9\s@.,#()-]+$/, // used for textfield address
  CHAR_NUM_DASH: /^[A-Za-z0-9-]+$/, // used for only num,chars,dash like; postal code
  NUM_PLUS_MINUS: /^[+-\d\s]+$/,
  ACTION_WITHOUT_SPACE: /^[a-zA-Z0-9/-]+$/,
  PASSWORD: /^[^\s]+$/,
  NUM_DASH: /^[0-9-]+$/, // used for num,dash type text
  PHONE: /^[\d()+-]*\d[\d()+-]*$/, // used for phone type text
  ONLY_NUM: /^\d+$/, // used for string type text
  ALLOW_ALL: /^[\s\S]+$/, // userd for allowed all
  POINT_NUM: /^[+-]?([0-9]*[.])?[0-9]+$/,
  CHAR_NUM_MINUS_AT_SPACE: /^[a-zA-Z0-9@ -]+$/,
  CHAR_NUM_MIN_AT_HASH_COM_DOT_SPA: /^[a-zA-Z0-9@,\-.# ]+$/,
};

export const MAX_LENGTH_EXCEEDED = 'Maximum length exceeded';
export const INVALID_CHAR = 'Invalid characters';
export const PASSWORD_SHOULD_SAME = 'Password must same to the new one.';
export const PH_MINI_LENGTH = 'Minimum length should be 15';

export const GENDER = [
  {
    id: 'Male',
    name: 'Male',
  },
  {
    id: 'Female',
    name: 'Female',
  },
  {
    id: 'Other',
    name: 'Other',
  },
];

export const CURRENCY_SYMBOL = import.meta.env.VITE_CURRENCY_SYMBOL;
