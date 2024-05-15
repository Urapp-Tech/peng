import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
// import { useState } from 'react';
import Modal from "../modal/Modal";
import MainHeading from "../typography/MainHeading";

const SubTabs = () => {
    // const [modalOpen, setModalOpen] = useState(false);

    // const handleBtnClick = () => {
    //     setModalOpen(true);
    // };

    return (
        <>
            <Tabs defaultValue="feature" className="w-full">
                <TabsList className="main-tabs">
                    <TabsTrigger value="feature" className="bg-white text-primary mr-[20px] ">Featured</TabsTrigger>
                    <TabsTrigger value="hair" className="bg-white text-primary mr-[20px] ">Hair</TabsTrigger>
                    <TabsTrigger value="nails" className="bg-white text-primary mr-[20px] ">Nails</TabsTrigger>
                    <TabsTrigger value="waxing" className="bg-white text-primary mr-[20px] ">Waxing</TabsTrigger>
                    <TabsTrigger value="facials" className="bg-white text-primary mr-[20px] ">Facials</TabsTrigger>
                </TabsList>
                <TabsContent value="feature">
                    <MainHeading title="Featured"/>
                  
                    <Modal mainTitle="Beard" time="40 mins - 50 mins" features="Classic cut, wash & style" pricing="From AEd 250" priceTitle="Price" />
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
        </>
    );
};

export default SubTabs;
