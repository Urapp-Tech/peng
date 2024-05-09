import assets from "@/assets";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { DateOfBirthInput } from "../buttons/DobBtn";

const RegisterModal = () => {
    return (
        <div className="bg-modals rounded-[30px] bg-[#000]">
           <Dialog>
      <DialogTrigger asChild>
        <button >Edit Profile</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-[30px]">
        <DialogHeader>
          <DialogTitle className="text-center w-full mt-[15px]">
            <img src={assets.images.greenLogo} alt="logo" className="mx-auto"/>
          </DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
        <div className="w-full">
  <form className="bg-white px-1 pt-6 pb-8 mb-4">
    <div className="flex justify-between items-center mb-2">
    <div className="pr-1">
      <label
        className="block text-txt-color text-[12px] font-semibold mb-1"
        htmlFor="username"
      >
        Full Name
      </label>
      <input
        className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
    <div className="pl-1">
      <label
        className="block text-txt-color text-[12px] font-semibold mb-1"
        htmlFor="username"
      >
           Last Name
      </label>
      <input
        className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color leading-tight focus:outline-none"
        id="username"
        type="text"
        placeholder="Username"
      />
    </div>
   
    </div>
    <p className="my-[10px] text-[10px] text-txt-color leading-normal font-semibold">  Make sure it matches your ID name</p>
    <div className="mb-1">
      <label
        className="block text-txt-color text-[12px] font-semibold mb-1"
        htmlFor="email"
      >
        Email Address
      </label>
      <input
        className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none "
        id="email"
        type="email"
        placeholder="Email..."
      />

    </div>
  
    <div className="mb-2">
    <label
        className="block text-txt-color text-[12px] font-semibold mb-1"
        htmlFor="email"
      >
        DOB
      </label>
    <DateOfBirthInput />
  
    </div>
    <div className="mb-1">
      <label
        className="block text-txt-color text-[12px] font-semibold mb-1"
        htmlFor="password"
      >
        Password
      </label>
      <input
        className="appearance-none border border-primary rounded w-full py-2 px-3 text-txt-color mb-3 leading-tight focus:outline-none "
        id="password"
        type="password"
        placeholder="******************"
      />
  
    </div>

    <div className="flex items-center justify-center">
      <button
        className="w-full bg-primary text-white font-bold py-2 px-4 text-[12px] leading-noramal rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Sign up
      </button>
   
    </div>
 

    <div className="my-[15px] text-center flex justify-center">
          <span className="text-heading-color text-[12px] font-bold leading-normal block mr-1">Do you have already an Account? </span>
        <a  href="#" className="text-primary text-[12px] font-semibold">Sign in </a>
    </div>
  </form>
  {/* <p className="text-center text-gray-500 text-xs">
    ©2020 Acme Corp. All rights reserved.
  </p> */}
</div>

        {/* <DialogFooter>
          <button type="submit">Save changes</button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
        </div>


    )
}
export default RegisterModal;