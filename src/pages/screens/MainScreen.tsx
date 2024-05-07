import assets from "@/assets";
const MainScreen = () => {

    return (
        <>




            <div className='w-full h-screen main-sel-scr '>
                <div className="mx-auto p-[30px] relative">
                    <div className="w-[83px] h-[32px] absolute top-[40px] left-[100px] z-[11]">
                        <img src={assets.images.logo} alt="logo" className="w-full object-contain h-auto" />
                    </div>
                </div>

                <div className="flex justify-center items-center pt-[10%]">
                    <div className="mx-auto text-center mb-[30px] flex-1 max-w-[400px]">
                        <h1 className="text-white capitalize text-[40px] font-normal mb-[10px] ">
                            Choose an option
                        </h1>
                        <div className="py-[20px]">
                            <button className=" bg-white rounded-[10px] w-full px-[25px] text-heading-color text-[16px] font-bold leading-normal flex-col py-[28px] items-start">
                                Book an Appointment
                                <span className="block mt-[5px] text-txt-color text-[10px] leading-normal font-semibold">Schedule service for yourself</span>
                            </button>
                        </div>
                        <div className="py-[20px]">
                            <button className="bg-white rounded-[10px] w-full px-[25px] text-heading-color text-[16px] font-bold leading-normal flex-col py-[28px] items-start">
                                Group Appointment
                                <span className="block mt-[5px] text-txt-color text-[10px] leading-normal font-semibold text-left">For yourself & others</span>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainScreen