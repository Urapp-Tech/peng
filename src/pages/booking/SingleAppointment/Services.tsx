import ServiceDetailDialog from '@/components/common/dialog/ServiceDetailDialog';
import MainHeading from '@/components/common/typography/MainHeading';
import Skeleton from '@/components/ui/skeleton';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { StoreService } from '@/interfaces/serviceCategory.interface';
import { fetchCategoriesItems } from '@/redux/features/storeCategoryItemsSlice';
import {
  fetchCategories,
  setSelectedCategory,
} from '@/redux/features/storeCategorySlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import ServiceCard from './ServiceComponents/ServiceCard';
import { getItem } from '@/utils/local-storage';

const Services = () => {
  const {
    categories,
    loading: CatLoading,
    notify,
    notifyMessage,
    selectedCategory,
  } = useAppSelector((x) => x.storeCategoryState);
  const dispatch = useAppDispatch();
  const { systemConfig } = useAppSelector((x) => x.appState);
  const branchData: any = getItem('BRANCH');
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [detail, setDetail] = useState<StoreService | null>();
  const { categoryItems, loading: serviceLoading } = useAppSelector(
    (s) => s.storeCategoryItemState
  );

  const selectCategory = (categoryId: string) => {
    const cat = categories.find((x) => x.id === categoryId);
    if (cat) {
      dispatch(setSelectedCategory(cat));
    }
  };

  const showDetails = (s: StoreService) => {
    setDetail(s);
    setOpen(true);
  };

  useEffect(() => {
    if (notify) {
      toast({
        title: notifyMessage.text,
        variant:
          (notifyMessage?.type as
            | 'default'
            | 'destructive'
            | null
            | undefined) ?? 'default',
      });
    }
  }, [notify]);

  // console.log('🚀 ~ Services ~ branchData:', branchData);
  // console.log('systemConfig', systemConfig);

  useEffect(() => {
    if (selectedCategory?.id) {
      dispatch(
        fetchCategoriesItems({
          branch: branchData?.id,
          tenant: systemConfig?.tenant,
          categoryId: selectedCategory.id,
          search: undefined,
        })
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory?.id && categories.length > 0) {
      selectCategory(categories[0].id);
    }
  }, [categories]);

  const handleTabChange = (e: any) => {
    selectCategory(e);
  };

  useEffect(() => {
    if (systemConfig && !_.isEmpty(systemConfig.tenant)) {
      dispatch(fetchCategories(systemConfig.tenant));
    }
  }, [systemConfig]);

  return (
    <>
      <MainHeading title="Select Services" />
      {CatLoading && <Skeleton className="h-[50px] w-full rounded-3xl" />}

      {!CatLoading && (
        <Tabs
          onValueChange={handleTabChange}
          value={selectedCategory?.id || ''}
          defaultValue={selectedCategory?.id || ''}
          className="w-full"
        >
          <div className="m--tabs overflow-x-auto max-sm:overflow-y-hidden max-sm:overflow-x-scroll max-sm:pb-4">
            <TabsList className="main-tabs max-sm:mx-auto max-sm:w-[600px]">
              {categories.map((c, i) => (
                <TabsTrigger
                  value={c.id}
                  key={i}
                  className="mr-[20px] bg-white text-primary "
                >
                  {c.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      )}

      <div className="peng-services-area mt-10">
        {serviceLoading && (
          <Skeleton className="mt-10 h-[170px] w-full rounded-3xl" />
        )}

        {!serviceLoading &&
          categoryItems.map((s, i) => (
            <ServiceCard service={s} key={i} showServiceDetail={showDetails} />
          ))}
      </div>
      {detail && (
        <ServiceDetailDialog
          service={detail}
          open={open}
          handleClose={setOpen}
        />
      )}
    </>
  );
};

export default memo(Services);
