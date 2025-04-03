import { useToast } from '@/components/ui/use-toast';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { useRoutes } from 'react-router-dom';
import { setSystemConfig } from './redux/features/appStateSlice';
import { setTenant, setTenantConfig } from './redux/features/deviceState';
import { useAppDispatch, useAppSelector } from './redux/redux-hooks';
import routeObjects from './routes/AppRoutes';
import appService from './services/app.service';
import tenantService from './services/tenant.service';
import promiseHandler from './utils/promise-handler';
import { fetchBranch, setBranch } from './redux/features/branchSlice';
import _ from 'lodash';
import SelectBranchModal from './components/common/modal/SelectBranchModal';
import axiosInstance from './api/axiosInstance';
import { login, RegisteredUser } from './redux/features/authStateSlice';

// Create a separate component to handle route rendering
function RouterOutlet() {
  const routing = useRoutes(routeObjects);

  return routing;
}

function App() {
  const persistedDeviceData = useAppSelector(
    (state) => state.deviceStates.deviceData
  );
  const loginUser = useAppSelector((state) => state.authState.user);

  const { toast } = useToast();

  const dispatch = useAppDispatch();
  const { systemConfig } = useAppSelector((s) => s.appState);
  const { selectedBranch, branches } = useAppSelector((s) => s.branchState);
  const { showBoundary } = useErrorBoundary();
  const [openBranchModal, setOpenBranchModal] = useState<boolean>(false);

  const fetchBranches = (data: any) => {
    dispatch(fetchBranch(data));
  };

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
    const getProfile = async () => {
      const userProfile = await axiosInstance.get(`/app/app-user/profile`);
      dispatch(
        login({
          ...loginUser,
          loyaltyCoins: Number(userProfile.data.data.loyaltyCoins) || 0,
        } as RegisteredUser)
      );
      // console.log('userProfile', userProfile);
    };
    getProfile();
  }, []);

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
      const ResponeConfig = { ...getSystemConfigResult?.data?.data };
      const config = {
        ...ResponeConfig,
        tenantObject: ResponeConfig?.tenant,
        tenant: ResponeConfig?.tenant?.id,
      };
      dispatch(setSystemConfig(config));
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
      if (_.isEmpty(selectedBranch)) {
        fetchBranches({ tenant: systemConfig.tenant });
      }
    }
  }, [systemConfig]);

  useEffect(() => {
    if (branches.length > 1 && _.isEmpty(selectedBranch)) {
      setOpenBranchModal(true);
    } else if (branches.length === 1) {
      dispatch(setBranch(branches[0]));
    }
  }, [branches, selectedBranch, dispatch]);
  // useEffect(() => {
  //   if (!user || !user.id) {
  //     navigate('/auth/login');
  //   }
  // }, [user]);

  // if (process.env.NODE_ENV === 'production') {
  //   console.log = () => {};
  //   console.error = () => {};
  //   console.warn = () => {};
  // }

  return (
    <>
      <RouterOutlet />
      <SelectBranchModal
        openModal={openBranchModal}
        closeModal={() => setOpenBranchModal(false)}
        branches={branches}
      />
    </>
  );
}

export default App;
