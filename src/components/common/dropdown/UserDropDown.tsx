import assets from "@/assets";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Props ={
  onclick?: (item?: any) => void;
  title?: string;
}
const UserDropDown = ( {onclick,title}:Props) => {
  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger className="bg-white border-2 border-primary rounded-[32px] px-[10px] py-[5px]" onClick={onclick || (() => { })}>
          <div className="flex justify-between items-center p-[5px]">
            <span className="block">
              <img
                src={assets.images.avatar}
                alt="icon"
                width="29px"
                height="29px"
              />
            </span>
            <span className="block px-[10px] text-heading-color text-[14px] leading-normal font-bold">
              {title}
            </span>
            <span className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
              >
                <g clipPath="url(#clip0_75_654)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.075 1.19979C13.3253 1.45752 13.3253 1.87434 13.075 2.13143L7.77227 7.58061C7.65539 7.70259 7.5147 7.79972 7.35878 7.86608C7.20286 7.93245 7.03495 7.96668 6.86528 7.96668C6.6956 7.96668 6.5277 7.93245 6.37177 7.86608C6.21585 7.79972 6.07517 7.70259 5.95828 7.58061L0.616404 2.09197C0.49702 1.96741 0.429919 1.80245 0.428727 1.6306C0.427535 1.45874 0.492343 1.29288 0.609988 1.1667C0.668084 1.10419 0.738502 1.05418 0.81688 1.01975C0.895257 0.985328 0.979927 0.967227 1.06564 0.966571C1.15136 0.965915 1.2363 0.982717 1.31521 1.01594C1.39411 1.04916 1.4653 1.09809 1.52436 1.1597L6.41194 6.18316C6.47039 6.2442 6.54075 6.2928 6.61874 6.32601C6.69673 6.35923 6.78072 6.37636 6.8656 6.37636C6.95048 6.37636 7.03447 6.35923 7.11246 6.32601C7.19045 6.2928 7.26081 6.2442 7.31926 6.18316L12.1683 1.19979C12.2267 1.13877 12.297 1.09018 12.375 1.05697C12.4529 1.02376 12.5368 1.00664 12.6217 1.00664C12.7065 1.00664 12.7904 1.02376 12.8684 1.05697C12.9463 1.09018 13.0166 1.13877 13.075 1.19979Z"
                    fill="#8CAC89"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_75_654">
                    <rect
                      width="7"
                      height="12.8333"
                      fill="white"
                      transform="matrix(1.19249e-08 1 1 -1.19249e-08 0.429199 0.967041)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserDropDown;
