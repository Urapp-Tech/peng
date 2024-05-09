import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import MainHeading from "../typography/MainHeading";

const MsgModal = () => {
    return (
        <div className="bg-modals rounded-[30px] bg-[#000]">
           <Dialog>
      <DialogTrigger asChild>
        <button >Edit Profile</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-[30px]">
        <DialogHeader>
          <DialogTitle className="text-center w-full mt-[15px]">
            <MainHeading title="Is this your first visit to peng salon & spa?" customClass="capitalize" />
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="w-full">

      <button
        className="w-full bg-primary text-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline mb-2"
        type="button"
      >
        Yes
      </button>
      <button
        className="capitalize text-primary border-1 border-primary w-full bg-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        no
      </button>
    </div>
 

 
  {/* <p className="text-center text-gray-500 text-xs">
    ©2020 Acme Corp. All rights reserved.
  </p> */}


        {/* <DialogFooter>
          <button type="submit">Save changes</button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
        </div>


    )
}
export default MsgModal;