import axiosInstance from '@/api/axiosInstance';
import { store } from '@/redux/store';
import { DeviceRegistration } from '../types/device.types';
import {
  GetTenantConfigResponse,
  GetTenantDetailsResponse,
} from '../types/tenant.types';
import { getHeaders } from '../utils/constant';

const getTenantWithController = () => {
  const tenant = store.getState().appState.systemConfig?.tenant;
  let getTenantController = new AbortController();
  return () => {
    getTenantController.abort();
    getTenantController = new AbortController();
    return axiosInstance.get<GetTenantDetailsResponse>(
      `/app/shop/view/${tenant}`,
      {
        signal: getTenantController.signal,
        headers: getHeaders(),
      }
    );
  };
};

const getTenantConfigWithController = () => {
  const tenant = store.getState().appState.systemConfig?.tenant;
  let getTenantConfigController = new AbortController();
  return () => {
    getTenantConfigController.abort();
    getTenantConfigController = new AbortController();
    return axiosInstance.get<GetTenantConfigResponse>(
      `/app/config/view/${tenant}`,
      {
        signal: getTenantConfigController.signal,
        headers: getHeaders(),
      }
    );
  };
};

const deviceRegistrationWithController = () => {
  let deviceRegistrationController = new AbortController();
  return (deviceData: DeviceRegistration) => {
    deviceRegistrationController.abort();
    deviceRegistrationController = new AbortController();
    return axiosInstance.post(
      `/app/app-user-device/register-device`,
      deviceData,
      {
        signal: deviceRegistrationController.signal,
        headers: getHeaders(),
      }
    );
  };
};

export default {
  getTenant: getTenantWithController,
  deviceRegistration: deviceRegistrationWithController(),
  getTenantConfig: getTenantConfigWithController(),
};
