import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

type Props = {
  onclick?: (item?: any) => void;
  items: { titles: string; callback: () => void }[];
  title?: string;
};
const UserOptionDropDown = ({ onclick, title = '', items = [] }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-[32px] border-2 border-primary bg-white px-[10px] py-[5px]"
        onClick={onclick || (() => {})}
      >
        <div className="flex items-center justify-between p-[5px]">
          <span className="block px-[10px] text-[14px] font-bold leading-normal text-heading-color">
            {title}
          </span>
          <span className="block">
            <ChevronDown className="text-primary" />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {items.map(({ titles, callback }, index) => (
          <DropdownMenuItem key={index} onClick={() => callback()}>
            {titles}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptionDropDown;
