// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



import { Navigation } from 'swiper/modules';
import DateBtn from '../buttons/DateBtn';

// import required modules
const DateSldier = () => {
    return (
        <>
             <Swiper
             
            modules={[Navigation]}

            slidesPerView={6} // Number of slides per view
            navigation={ true}
      
            className="mySwiper"
        >
            <SwiperSlide>
               
                <DateBtn dateTitle='29' dayTitle='wed'/>
            </SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='29' dayTitle='Sun'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='30' dayTitle='Thurs'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='1' dayTitle='Fri'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='2' dayTitle='Sat'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='3' dayTitle='Sun'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='5' dayTitle='Mon'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='6' dayTitle='Tue'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='8' dayTitle='wed'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='9' dayTitle='Thurs'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='10' dayTitle='Mon'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='11' dayTitle='Tue'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='12' dayTitle='Sat'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='13' dayTitle='Mon'/></SwiperSlide>
            <SwiperSlide>      <DateBtn dateTitle='14' dayTitle='wed'/></SwiperSlide>
        </Swiper>
        </>
    )
}

export default DateSldier;

