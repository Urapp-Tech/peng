import assets from "@/assets";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import IconButtons from "../buttons/IconButtons";
import ImageBtn from "../buttons/ImageBtn";
import TimeSlotsBtn from "../buttons/TimeSlotsBtn";
import UserDropDown from "../dropdown/UserDropDown";
import DateSldier from "../sliders/DateSldier";
import MainHeading from "../typography/MainHeading";
import SubTabs from "./SubTabs";


const MainTabs = () => {

    return (
    
        <div className="px-[5%]">            
        <Tabs defaultValue="account" className="w-full">
                <TabsList className="main-tabs">
                    <TabsTrigger value="account" className="bg-white text-primary mr-[20px] ">Services</TabsTrigger>
                    <TabsTrigger value="professional" className="bg-white text-primary mr-[20px] ">Professional</TabsTrigger>
                    <TabsTrigger value="time" className="bg-white text-primary mr-[20px] ">Time</TabsTrigger>
                    <TabsTrigger value="confirm" className="bg-white text-primary mr-[20px] ">Confirm</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <MainHeading title="Select Services"/>
                   
                    <SubTabs />
                </TabsContent>
                <TabsContent value="professional">
                <MainHeading title="Select Professional"/>
               
                    <div className="w-full flex justify-between items-center flex-wrap">
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px] " />
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />

                    </div>
                    <div className="w-full flex justify-between items-center flex-wrap">
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px] " />
                        <IconButtons title="Select Professional Per Service" avatarIcon={assets.images.service}/>
                        <IconButtons title="Any Professional" avatarIcon={assets.images.groups} subTitle="for maximum availability from AED 250" />

                    </div>


                </TabsContent>
                <TabsContent value="time"> 
                    <MainHeading title="Select Date & Time"/>
                   <UserDropDown/>
                   <div className="flex justify-between my-[15px]">
                        <span className="block text-heading-color text-[16px] font-bold leading-normal capitalize">April 2024</span>
                        <span className="block text-heading-color text-[16px] font-bold leading-normal capitalize">May 2024</span>
                   </div>
                   <DateSldier/>
                   <div className="shadow-md my-[15px] max-h-[400px] overflow-x-hidden overflow-y-scroll p-[15px]">
                   <TimeSlotsBtn time="1:00 PM"/>
                   <TimeSlotsBtn time="2:00 PM"/>
                   <TimeSlotsBtn time="3:00 PM"/>
                   <TimeSlotsBtn time="4:00 PM"/>
                   <TimeSlotsBtn time="5:00 PM"/>
                   <TimeSlotsBtn time="6:00 PM"/>
                   <TimeSlotsBtn time="7:00 PM"/>
                   <TimeSlotsBtn time="8:00 PM"/>
                   <TimeSlotsBtn time="9:00 PM"/>
                   <TimeSlotsBtn time="1:00 PM"/>
                   <TimeSlotsBtn time="2:00 PM"/>
                   <TimeSlotsBtn time="3:00 PM"/>
                   <TimeSlotsBtn time="4:00 PM"/>
                   <TimeSlotsBtn time="5:00 PM"/>
                   </div> 
                   </TabsContent>
                <TabsContent value="confirm">Change your password here.</TabsContent>
            </Tabs>
        </div>

    )
}

export default MainTabs;