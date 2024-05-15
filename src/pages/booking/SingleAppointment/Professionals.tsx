import assets from "@/assets";
import IconButtons from "@/components/common/buttons/IconButtons";
import ImageBtn from "@/components/common/buttons/ImageBtn";
import MainHeading from "@/components/common/typography/MainHeading";
import { useNavigate } from "react-router-dom";

const Professionals = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Perform navigation and open modal
    navigate("/booking/appointment/professional"); // Navigate to the login route
  };

  return (
    <>
      <MainHeading title="Select Professional" />

      <div className="w-full flex justify-between items-center flex-wrap">
        <ImageBtn
          title="Selena Swift"
          ratingTxt="4.9"
          ratingIcon={assets.images.rank}
          avatarIcon={assets.images.avatar}
          category="Beautician"
          customClass="mr-[5px] mb-[10px] "
        />
        <ImageBtn
          title="Selena Swift"
          ratingTxt="4.9"
          ratingIcon={assets.images.rank}
          avatarIcon={assets.images.avatar}
          category="Beautician"
          customClass="mr-[5px] mb-[10px]"
        />
        <ImageBtn
          title="Selena Swift"
          ratingTxt="4.9"
          ratingIcon={assets.images.rank}
          avatarIcon={assets.images.avatar}
          category="Beautician"
          customClass="mr-[5px] mb-[10px]"
        />
      </div>
      <div className="w-full flex justify-between items-center flex-wrap">
        <ImageBtn
          title="Selena Swift"
          ratingTxt="4.9"
          ratingIcon={assets.images.rank}
          avatarIcon={assets.images.avatar}
          category="Beautician"
          customClass="mr-[5px] mb-[10px] "
        />
        <IconButtons
          title="Select Professional Per Service"
          avatarIcon={assets.images.service}
          onclick={handleClick}
          customClass="mr-[5px] mb-[10px]"
        />
        <IconButtons
          title="Any Professional"
          avatarIcon={assets.images.groups}
          subTitle="for maximum availability from AED 250"
          customClass="mr-[5px] mb-[10px]"
        />
      </div>
    </>
  );
};

export default Professionals;
