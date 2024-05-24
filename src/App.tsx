import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useRoutes } from 'react-router-dom';
import { setSystemConfig } from './redux/features/appStateSlice';
import { setTenant, setTenantConfig } from './redux/features/deviceState';
import { useAppDispatch, useAppSelector } from './redux/redux-hooks';
import routeObjects from './routes/AppRoutes';
import appService from './services/app.service';
import tenantService from './services/tenant.service';
import promiseHandler from './utils/promise-handler';

// Create a separate component to handle route rendering
function RouterOutlet() {
  const routing = useRoutes(routeObjects);

  return routing;
}

function App() {
  const persistedDeviceData = useAppSelector(
    (state) => state.deviceStates.deviceData
  );

  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const { systemConfig } = useAppSelector((s) => s.appState);
  const { showBoundary } = useErrorBoundary();

  async function initializeDeviceData() {
    if (persistedDeviceData) {
      return;
    }
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
  }, [systemConfig]);

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

  return <RouterOutlet />;
}

export default App;
