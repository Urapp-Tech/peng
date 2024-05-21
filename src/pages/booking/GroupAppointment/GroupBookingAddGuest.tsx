import assets from "@/assets";
import UserOptionDropDown from "@/components/common/dropdown/UserOptionDropDown";
import MainHeading from "@/components/common/typography/MainHeading";
import { Button } from "@/components/ui/button";
import { GroupBooking, removeAllServiceOfCustomer, setSelectedCustomer } from "@/redux/features/groupBookingSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import _ from "lodash";
import { PlusIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GroupBookingAddGuest = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { bookings, mainCustomer } = useAppSelector(x => x.groupBookingState);
  const [ customers  , setCustomers ] = useState<string[]>([]);

  const handleAddGuestClick = () => {
    dispatch(setSelectedCustomer(`Guest ${customers.length}`))
    navigate('/booking/group-appointment/services');
  }

  const handleEditService = (customer:string) => {
    dispatch(setSelectedCustomer(customer))
    navigate('/booking/group-appointment/services');
  }

  const handleRemoveGuest = (customer:string) => {
    dispatch(removeAllServiceOfCustomer(customer))
  }

  useEffect(() =>{
    const c = bookings.reduce((customers: string[], booking: GroupBooking) => {
      if(!customers.includes(booking.customer))
      customers.push(booking.customer)
      return customers;
    },[])

    setCustomers(c);
  }, [bookings])
 
  return (
    <>
      <MainHeading title="Select Services" />

     

      <div className="peng-services-area mt-10">
      {customers.map((customer, i)=> (

        <div key={i} className="w-full bg-transparent border-2 border-primary rounded-[20px] p-[20px] my-[20px] min-h-[160px] content-center">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-3 justify-center flex">
              <img src={assets.images.avatar} alt="" />
            </div>
            <div className="col-span-6">
              <h1 className="text-lg">{customer}</h1>
              <h6 className="text-sm">{bookings.filter(x => x.customer == customer).length} Service (s)</h6>
            </div>
            <div className="col-span-3">
              { mainCustomer == customer &&  <UserOptionDropDown title="Options" items={[ {titles: 'Edit Services' , callback: () => handleEditService(customer)  } ]} />}
              { mainCustomer !== customer &&  <UserOptionDropDown title="Options" items={[{titles: 'Edit Services' , callback: () => handleEditService(customer)  } , {titles: 'Remove Guest' , callback: () => handleRemoveGuest(customer)  } ]} />}
            </div>
          </div>
        </div>
      ))}
        
      </div>

      <Button variant={"outline"} onClick={handleAddGuestClick} className=" border-2 border-primary rounded-[20px] p-[20px] my-[20px] content-center">
          Add Guest
          <PlusIcon className="mx-3 text-primary" />
      </Button>
    </>
  );
};

export default memo(GroupBookingAddGuest);
