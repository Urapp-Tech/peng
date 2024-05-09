import Header from "@/components/common/header/Header";
import MainTabs from "@/components/common/tabs/MainTabs";
import RightSideBar from "@/components/layouts/RightSideBar";

const ProfessionalService = () => {
    return (
        <>

            <Header />
            <div className="w-full h-full">

                <div className="w-full flex h-full justify-between max-w-[1200px] mx-auto px-[20px] py-[40px]">
                    <div className=" w-[65%] main-tabs px-[20px]">

                        {/* <Tabs defaultValue="account" className="w-full">
                            <TabsList className="main-tabs">
                                <TabsTrigger value="account" className="bg-[#fff] text-primary mr-[20px] ">ProfessionalService</TabsTrigger>
                                <TabsTrigger value="professional" className="bg-[#fff] text-primary mr-[20px] ">Professional</TabsTrigger>
                                <TabsTrigger value="time" className="bg-[#fff] text-primary mr-[20px] ">Time</TabsTrigger>
                                <TabsTrigger value="confirm" className="bg-[#fff] text-primary mr-[20px] ">Confirm</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">

                                <h1 className="my-[20px] text-[30px] font-normal text-heading-color">Select Services</h1>
                                <SubTabs />
                            </TabsContent>
                            <TabsContent value="professional">

                                <div className="w-full flex justify-between items-center flex-wrap">
                                    <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px] " />
                                    <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />
                                    <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />

                                </div>
                                <div className="w-full flex justify-between items-center flex-wrap">
                                    <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px] " />
                                    <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />
                                    <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />

                                </div>


                            </TabsContent>
                            <TabsContent value="time">Change your password here.</TabsContent>
                            <TabsContent value="confirm">Change your password here.</TabsContent>
                        </Tabs> */}
                        <MainTabs />

                    </div>
                    <div className="w-[35%]">
                        <RightSideBar />
                    </div>
                </div>
            </div>
        </>

    )
}

export default ProfessionalService;