import axiosInstance from '@/api/axiosInstance';
import { GetSystemConfigResponse } from '../types/app.types';
import { getDomainName } from '@/utils/theme';

const getSystemConfigWithController = () => {
  let getSystemConfigController = new AbortController();
  return () => {
    getSystemConfigController.abort();
    getSystemConfigController = new AbortController();
    return axiosInstance.get<GetSystemConfigResponse>(`/system/config/get/theme/${getDomainName()}`, {
      signal: getSystemConfigController.signal,
    });
  };
};

export default {
  getSystemConfig: getSystemConfigWithController(),
};
