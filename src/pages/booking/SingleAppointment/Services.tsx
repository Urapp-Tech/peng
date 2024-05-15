import Modal from "@/components/common/modal/Modal";
import MainHeading from "@/components/common/typography/MainHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCategories } from "@/redux/features/storeCategorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import _ from "lodash";
import { useEffect } from "react";

const Services = () => {
  const {
    categories,
    loading: CatLoading,
    notify,
    notifyMessage,
    selectedCategory,
    short_categories,
  } = useAppSelector((x) => x.storeCategoryState);
  const dispatch = useAppDispatch(); 
  const { systemConfig } = useAppSelector(x => x.appState)

  const handleTabChange = (e: any) => {
    console.log("🚀 ~ Services ~ e:", e);
  };

  useEffect(() => {
    if(systemConfig && !_.isEmpty(systemConfig.tenant)) {
        dispatch(fetchCategories(systemConfig.tenant))
    }
  }, [])

  return (
    <>
      <MainHeading title="Select Services" />
      { CatLoading && (
        <Skeleton className="w-full h-[50px]" /> 
      )}

      <Tabs
        onValueChange={handleTabChange}
        defaultValue="feature"
        className="w-full"
      >
        <TabsList className="main-tabs">
        { !CatLoading && categories.map( (c, i) => (
          <TabsTrigger
            value={c.id}
            key={i}
            className="bg-white text-primary mr-[20px] "
          >
            {c.name}
          </TabsTrigger>
        )) }
          
        </TabsList>
      </Tabs>
    </>
  );
};

export default Services;
