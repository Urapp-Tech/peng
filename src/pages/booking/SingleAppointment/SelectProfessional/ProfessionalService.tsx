import assets from "@/assets";
import IconButtons from "@/components/common/buttons/IconButtons";
import ImageBtn from "@/components/common/buttons/ImageBtn";
import CardsBtn from "@/components/common/cards/CardsBtnDrop";
import Header from "@/components/common/header/Header";
import MainHeading from "@/components/common/typography/MainHeading";
import RightSideBar from "@/components/layouts/RightSideBar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/dialog";
const ProfessionalService = () => {
  return (
    <>
      <Header />
      <div className="w-full h-full">
        <div className="w-full flex h-full justify-between max-w-[1200px] mx-auto px-[20px] py-[40px]">
          <div className=" w-[65%] main-tabs px-[20px]">
            <CardsBtn mainTitle="haircut" time="5.00" />
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-primary">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="max-w[800px] mx-auto bg-white rounded-lg shadow-md min-h-[600px]">
                <DialogHeader>
                  <MainHeading title="Haircut"/>
                
                </DialogHeader>
                <div className="w-full flex justify-between items-center flex-wrap">
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px] " />
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px]" />

                    </div>
                    <div className="w-full flex justify-between items-center flex-wrap" >
                        <ImageBtn title="Selena Swift" ratingTxt="4.9" ratingIcon={assets.images.rank} avatarIcon={assets.images.avatar} category="Beautician" customClass="mr-[5px] mb-[10px] " />
                        <IconButtons title="Select Professional Per Service" avatarIcon={assets.images.service} customClass="mr-[5px] mb-[10px] "/>
                        <IconButtons title="Any Professional" avatarIcon={assets.images.groups} subTitle="for maximum availability from AED 250" customClass="mr-[5px] mb-[10px] "/>

                    </div>
                {/* <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter> */}
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-[35%]">
            <RightSideBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfessionalService;
