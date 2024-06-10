import { useAppSelector } from '@/redux/redux-hooks';
import { Banner } from '@/types/app.types';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import assets from '@/assets/index';

const BannerSwiper = () => {
  const banners = useAppSelector((x) => x.appState?.systemConfig?.banners);
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      autoplay
      loop
      speed={200}
      slidesPerView={1}
    >
      {banners &&
        banners
          .filter((x) => x.bannerType === 'Slider')
          .map((x: Banner) => (
            <SwiperSlide key={x.id}>
              <img
                src={x.banner}
                alt="interior"
                className="block h-[300px] w-full rounded-[20px]"
              />
            </SwiperSlide>
          ))}
      {banners &&
        banners.filter((x) => x.bannerType === 'Slider')?.length === 0 && (
          <SwiperSlide>
            <img
              src={assets.images.noImage}
              alt="interior"
              className="block w-full rounded-[20px] object-contain"
            />
          </SwiperSlide>
        )}
    </Swiper>
  );
};
export default BannerSwiper;
