import axiosInstance from '@/api/axiosInstance';
import { getDomainName } from '@/utils/theme';
import { GetSystemConfigResponse } from '../types/app.types';

const getSystemConfigWithController = () => {
  let getSystemConfigController = new AbortController();
  return () => {
    getSystemConfigController.abort();
    getSystemConfigController = new AbortController();
    return axiosInstance.get<GetSystemConfigResponse>(
      `/system/config/get/theme/${getDomainName()}`,
      {
        signal: getSystemConfigController.signal,
      }
    );
  };
};

export default {
  getSystemConfig: getSystemConfigWithController(),
};
