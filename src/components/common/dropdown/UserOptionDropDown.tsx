import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
type Props ={
  onclick?: (item?: any) => void;
  items: {titles: string, callback: Function}[];
  title?: string;
}
const UserOptionDropDown = ( {onclick,title = '', items = []  } :Props) => {
  return (
    <>
      <DropdownMenu >
        <DropdownMenuTrigger className="bg-white border-2 border-primary rounded-[32px] px-[10px] py-[5px]" onClick={onclick || (() => { })}>
          <div className="flex justify-between items-center p-[5px]">
            <span className="block px-[10px] text-heading-color text-[14px] leading-normal font-bold">
              {title}
            </span>
            <span className="block">
              <ChevronDown className="text-primary" />
              
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white">
          {items.map(({titles, callback}, index) => (
            <DropdownMenuItem key={index} onClick={() => callback()}>
              {titles}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserOptionDropDown;
