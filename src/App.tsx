import { useRoutes } from 'react-router-dom';
import { routeObjects } from './routes/AppRoutes';
import { useAppDispatch, useAppSelector } from './redux/redux-hooks';
import { useErrorBoundary } from 'react-error-boundary';
import promiseHandler from './utils/promise-handler';
import { useEffect } from 'react';
import { setDeviceData, setTenant, setTenantConfig } from './redux/features/deviceState';
import { setSystemConfig } from './redux/features/appStateSlice';
import { ClientJS } from 'clientjs';
import axiosInstance from './api/axiosInstance';
import appService from './services/app.service';
import tenantService from './services/tenant.service';
import { useToast } from "@/components/ui/use-toast"
import axios from 'axios';

// Create a separate component to handle route rendering
function RouterOutlet() {
  const routing = useRoutes(routeObjects);

  return routing;
}



function App() {

  const persistedDeviceData = useAppSelector(
    (state) => state.deviceStates.deviceData
  );

  const { toast } = useToast()
  
  const dispatch = useAppDispatch();
  const client = new ClientJS();
  const agent = client.getUserAgent();
  const {systemConfig } = useAppSelector(s => s.appState)
  const fingerprint = client.getFingerprint();
  const { showBoundary } = useErrorBoundary();
  async function fetchIp() {
    const url = new URL('https://api.ipify.org');
    url.searchParams.append('format', 'json');
    const ipPromise = axios.get(url.toString());
    const [ipResult] = await promiseHandler(ipPromise);
    if (!ipResult) {
      toast({
        title: 'System Configuration Error',
        variant: 'destructive',
        description: 'Error Occurred',
      });
      return null;
    }
    return ipResult.data.ip;
  }

  async function initializeDeviceData() {
    if (persistedDeviceData) {
      return;
    }
    const ip = await fetchIp();
    if (!ip) {
      return;
    }
    const nameValue = `${agent.slice(0, 11)}-${ip}-${fingerprint}`;
    const getTenantPromise = tenantService.getTenant();
    const [getTenantResult, getTenantError] =
      await promiseHandler(getTenantPromise());
    if (!getTenantResult) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: getTenantError.message,
      });
      return;
    }
    if (!getTenantResult.data.success) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: getTenantResult.data.message,
      });

      return;
    }
    dispatch(setTenantConfig(getTenantResult.data.data.tenantConfig));
    dispatch(setTenant(getTenantResult.data.data));
    const deviceRegistrationPromise = tenantService.deviceRegistration({
      deviceId: fingerprint.toString(),
      deviceType: 'Web',
      isNotificationAllowed: true,
      name: nameValue,
      tenant: getTenantResult.data.data.id,
      token: 'Push notifications are not available on the web platform.',
    });
    const [deviceRegistrationResult, deviceRegistrationError] =
      await promiseHandler(deviceRegistrationPromise);
    if (!deviceRegistrationResult) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: deviceRegistrationError.message,
      });

      return;
    }
    if (!deviceRegistrationResult.data.success) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: deviceRegistrationResult.data.message,
      });

      return;
    }
    dispatch(setDeviceData(deviceRegistrationResult.data.data));
  }

  useEffect(() => {
    async function getSystemConfig() {
      const getSystemConfigPromise = appService.getSystemConfig();
      const [getSystemConfigResult, getSystemConfigError] =
      await promiseHandler(getSystemConfigPromise);
      if (!getSystemConfigResult) {
        toast({
          title: 'System Configuration Error',
          variant: 'destructive',
          description: getSystemConfigError.message,
        });
        showBoundary(new Error(getSystemConfigError.message || ''));
        return;
      }
      if (!getSystemConfigResult.data.success) {
        toast({
          title: 'System Configuration Error',
          variant: 'destructive',
          description: getSystemConfigResult.data.message,
        });

        showBoundary(new Error(getSystemConfigResult.data.message || ''));
        return;
      }
      dispatch(setSystemConfig(getSystemConfigResult.data.data));
    }
    getSystemConfig();

  
    // initializeDeviceData();
  }, []);

  useEffect(() => {
    if (!systemConfig) {
      return;
    }
    if (systemConfig.tenant !== '') {
      initializeDeviceData();
    }
  }, [systemConfig])

  // useEffect(() => {
  //   if (!user || !user.id) {
  //     navigate('/auth/login');
  //   }
  // }, [user]);

  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.warn = () => {};
  }

  return (
      <RouterOutlet />
  )
}

export default App
