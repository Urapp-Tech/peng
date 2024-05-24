import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
// import   { useState } from 'react';
import Modal from '../modal/Modal';
import MainHeading from '../typography/MainHeading';

const SubTabs = () => {
  // const [modalOpen, setModalOpen] = useState(false);

  // const handleBtnClick = () => {
  //     setModalOpen(true);
  // };

  return (
    <Tabs defaultValue="feature" className="w-full">
      <TabsList className="main-tabs">
        <TabsTrigger
          value="feature"
          className="mr-[20px] bg-white text-primary "
        >
          Featured
        </TabsTrigger>
        <TabsTrigger value="hair" className="mr-[20px] bg-white text-primary ">
          Hair
        </TabsTrigger>
        <TabsTrigger value="nails" className="mr-[20px] bg-white text-primary ">
          Nails
        </TabsTrigger>
        <TabsTrigger
          value="waxing"
          className="mr-[20px] bg-white text-primary "
        >
          Waxing
        </TabsTrigger>
        <TabsTrigger
          value="facials"
          className="mr-[20px] bg-white text-primary "
        >
          Facials
        </TabsTrigger>
      </TabsList>
      <TabsContent value="feature">
        <MainHeading title="Featured" />

        <Modal
          mainTitle="Beard"
          time="40 mins - 50 mins"
          features="Classic cut, wash & style"
          pricing="From AEd 250"
          priceTitle="Price"
        />
        {/* <CardsBtn onclick={() => handleBtnClick()} mainTitle="Haircut" time="40 mins - 50 mins" features="Classic cut, wash & style" pricing="From AEd 250" />
           
                    <CardsBtn mainTitle="Beard" time="40 mins - 50 mins" features="Classic cut, wash & style" pricing="From AEd 250" />
                    <CardsBtn mainTitle="Manicure" time="40 mins - 50 mins" features="Classic cut, wash & style" pricing="From AEd 250" />
                    <CardsBtn mainTitle="Facials" time="40 mins - 50 mins" features="Classic cut, wash & style" pricing="From AEd 250" /> */}
      </TabsContent>
      <TabsContent value="hair">Change your hair here.</TabsContent>
      <TabsContent value="nails">Change your hair here.</TabsContent>
      <TabsContent value="waxing">Change your hair here.</TabsContent>
      <TabsContent value="facials">Change your hair here.</TabsContent>
    </Tabs>
  );
};

export default SubTabs;
