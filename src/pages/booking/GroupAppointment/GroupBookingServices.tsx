import MainHeading from "@/components/common/typography/MainHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { fetchCategoriesItems } from "@/redux/features/storeCategoryItemsSlice";
import { fetchCategories, setSelectedCategory } from "@/redux/features/storeCategorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import _ from "lodash";
import { memo, useEffect, useState } from "react";
import ServiceCard from "./GroupBookingServiceComponents/ServiceCard";
import ServiceDetailDialog from "@/components/common/dialog/ServiceDetailDialog";
import { StoreService } from "@/interfaces/serviceCategory.interface";
import assets from "@/assets";
import { setMainCustomer, setSelectedCustomer } from "@/redux/features/groupBookingSlice";

const GroupBookingServices = () => {
  const {
    categories,
    loading: CatLoading,
    notify,
    notifyMessage,
    selectedCategory,
  } = useAppSelector((x) => x.storeCategoryState);
  const dispatch = useAppDispatch();
  const { systemConfig } = useAppSelector((x) => x.appState);
  const { toast } = useToast();
  const { user } = useAppSelector((x) => x.authState);
  const { selectedCustomer } = useAppSelector(x => x.groupBookingState);
  const [ open , setOpen ] = useState<boolean>(false) ;
  const [ detail , setDetail ] = useState<StoreService | null>() ;
  const { categoryItems, loading:serviceLoading } = useAppSelector((s) => s.storeCategoryItemState)

  const selectCategory = (categoryId: string) => {
    const cat = categories.find((x) => x.id === categoryId);
    if (cat) {
      dispatch(setSelectedCategory(cat));
    }
  };

  const showDetails = (s: StoreService) => {
    setDetail(s);
    setOpen(true);
  }

  useEffect(() => {
    if (notify) {
      toast({
        title: notifyMessage.text,
        variant: (notifyMessage?.type as "default" | "destructive" | null | undefined) ?? 'default',
      })
    }
  }, [notify]);

  useEffect(() => {
    if (selectedCategory?.id) {
      dispatch(
        fetchCategoriesItems({
          tenant: systemConfig?.tenant,
          categoryId: selectedCategory.id,
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

  useEffect(() => {
    if(_.isEmpty(selectedCustomer)){
      if(!user) {
        dispatch(setSelectedCustomer('Me'));
        dispatch(setMainCustomer('Me'));
      }
      else {
        dispatch(setSelectedCustomer(user.firstName + " " + user.lastName));
        dispatch(setMainCustomer(user.firstName + " " + user.lastName));

      }
    }

  }, []);

  return (
    <>
      <MainHeading title="Select Services" customClass="mb-1" />

  <div className="p-3 my-2 flex content-center items-center gap-5">
    <img src={assets.images.avatar} alt="" className="h-[35px]" />

      {selectedCustomer}
  </div>



      {CatLoading && <Skeleton className="w-full h-[50px] rounded-3xl" />}


      {!CatLoading && (
        <Tabs
          onValueChange={handleTabChange}
          value={selectedCategory?.id || ''}
          defaultValue={selectedCategory?.id || ''}
          className="w-full"
        >
          <div className="max-sm:overflow-x-scroll max-sm:overflow-y-hidden max-sm:pb-4 m--tabs">
          <TabsList className="main-tabs max-sm:w-[600px] max-sm:mx-auto">
            {categories.map((c, i) => (
   
             <TabsTrigger
                value={c.id}
                key={i}
                className="bg-white text-primary mr-[20px] "
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
          <Skeleton className="w-full h-[170px] rounded-3xl mt-10" />
        )}

        {!serviceLoading  && categoryItems.map((s, i) =>(
          <ServiceCard service={s} key={i} showServiceDetail={showDetails} />
        ))}

      </div>
      {detail &&<ServiceDetailDialog service={detail} open={open} handleClose={setOpen}  />}
    </>
  );
};

export default memo(GroupBookingServices);
