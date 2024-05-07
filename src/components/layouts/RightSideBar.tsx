import assets from "../../assets"
import SubHeading from "../common/typography/SubHeading"

function RightSideBar() {
    return (
        <>
            <div className="w-full p-5 pb-0  border-2 border-primary rounded-[20px] min-h-[600px]">
                <div className="max-[355px] mx-auto">
                    <img src={assets.images.interior} alt="interior" className="w-full object-contain block" />
                </div>
                <div className="flex justify-between items-center">
                    <SubHeading title="Peng Saloon"/>
                 
                    <div className="flex items-center my-[20px]">
                        <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.06293 0.570557C6.86588 0.570644 6.6729 0.62671 6.50649 0.732226C6.34007 0.837743 6.20705 0.988367 6.12293 1.16656L4.53493 4.37156C4.53073 4.37912 4.52672 4.38679 4.52293 4.39456C4.51523 4.39571 4.50756 4.39704 4.49993 4.39856L1.00293 4.91656C0.804602 4.93581 0.615984 5.01163 0.459512 5.135C0.30304 5.25836 0.185301 5.42408 0.120304 5.61244C0.055306 5.8008 0.0457857 6.00386 0.0928753 6.19747C0.139965 6.39108 0.241682 6.56709 0.385925 6.70456L2.94593 9.17356L2.95193 9.17856C2.95554 9.18196 2.95826 9.18621 2.95983 9.19092C2.9614 9.19563 2.96178 9.20066 2.96093 9.20556V9.20956L2.35093 12.7776V12.7786C2.31744 12.972 2.33887 13.171 2.41276 13.3529C2.48666 13.5347 2.61007 13.6923 2.76899 13.8076C2.9279 13.9228 3.11596 13.9913 3.3118 14.005C3.50764 14.0188 3.70342 13.9774 3.87693 13.8856L7.02693 12.2206C7.03828 12.2156 7.05054 12.213 7.06293 12.213C7.07531 12.213 7.08757 12.2156 7.09893 12.2206L10.2489 13.8846C10.4223 13.977 10.6182 14.0189 10.8143 14.0055C11.0104 13.9921 11.1987 13.9238 11.3579 13.8085C11.5171 13.6932 11.6406 13.5356 11.7145 13.3535C11.7885 13.1714 11.8097 12.9722 11.7759 12.7786L11.1659 9.20856V9.20556C11.1639 9.20156 11.1649 9.19556 11.1659 9.19156C11.1674 9.18661 11.1702 9.18213 11.1739 9.17856L11.1799 9.17356L13.7389 6.70356C13.8829 6.56604 13.9843 6.39011 14.0312 6.19665C14.0781 6.00319 14.0685 5.80034 14.0035 5.61218C13.9386 5.42401 13.821 5.25845 13.6647 5.13514C13.5084 5.01184 13.32 4.93597 13.1219 4.91656L9.62593 4.39856C9.61829 4.39704 9.61062 4.39571 9.60293 4.39456C9.59913 4.38679 9.59513 4.37912 9.59093 4.37156L8.00293 1.16656C7.9188 0.988367 7.78578 0.837743 7.61936 0.732226C7.45295 0.62671 7.25998 0.570644 7.06293 0.570557Z" fill="#F2BD55" />
                        </svg>
                        <span className="text-txt-color text-[14px] font-semibold leading-normal">5.0 (102)</span>
                    </div>
                </div>

                <p className="block text-txt-color text-[12px] font-semibold leading-normal">
                    Building 6, Al Raya Street, City Walk Dubai, Dubai
                </p>
                <div className="flex my-[10px] justify-between">
                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[12px] font-semibold leading-normal">Haircut</span>
                        <span className="block text-txt-color text-[12px] font-semibold leading-normal">40 min - 50min </span>
                    </div>

                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[12px] font-semibold leading-normal">from AED 250</span>

                    </div>
                </div>

                <div className="flex my-[10px] justify-between">
                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[12px] font-semibold leading-normal">Haircut</span>
                        <span className="block text-txt-color text-[12px] font-semibold leading-normal">40 min - 50min </span>
                    </div>

                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[12px] font-semibold leading-normal">from AED 250</span>

                    </div>
                </div>

                <div className="flex my-[10px] justify-between">
                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[12px] font-semibold leading-normal">Haircut</span>
                        <span className="block text-txt-color text-[12px] font-semibold leading-normal">40 min - 50min </span>
                    </div>

                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[12px] font-semibold leading-normal">from AED 250</span>

                    </div>
                </div>

                <div className="flex mt-[30px] py-[15px] justify-between border-t-2 border-primary">
                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[16px] font-bold leading-normal">Total</span>

                    </div>

                    <div className="py-[10px]">
                        <span className="block text-heading-color text-[16px] font-bold leading-normal">from AED 250</span>

                    </div>
                </div>

                <div className="flex mt-[30px] py-[15px] justify-between">
                    <button className="w-full rounded-[10px] bg-primary text-white text-[16px] font-semibold leading-normal">
                        Continue
                    </button>
                </div>


            </div>
        </>

    )
}

export default RightSideBar