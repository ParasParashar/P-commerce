"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignOutButton, SignedOut } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { RiProfileFill } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { BsFillHeartFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { LogOut } from "lucide-react";
import { BiLogOut, BiSolidLogOut } from "react-icons/bi";

const Profile = () => {
  const { user } = useUser();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size={"icon"} className="rounded-full">
          <div className="relative h-10 w-10  rounded-full object-cover">
            <Image
              src={user?.imageUrl as string}
              alt="Profile Photo"
              fill
              className="object-cover rounded-full"
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="font-serif  w-56 themes flex flex-col items-center justify-center text-white rounded-lg p-1"
        side="bottom"
      >
        <Link
          href={"/profile/?q=Wishlist"}
          className="p-2 w-full flex  rounded-lg justify-between items-center text-md font-semibold hover:bg-[#1a1a1a] m-1 "
        >
          <BsFillHeartFill size={16} className="text-rose-600" />
          My Wishlist
        </Link>
        <Link
          href={"/profile/?q=Orders"}
          className="p-2 w-full flex  rounded-lg justify-between items-center text-md font-semibold hover:bg-[#1a1a1a] m-1 "
        >
          <TbTruckDelivery size={16} className="text-rose-600" />
          My Orders
        </Link>
        <Link
          href={"/profile/?q=Reviews"}
          className="p-2 w-full flex  rounded-lg justify-between items-center text-md font-semibold hover:bg-[#1a1a1a] m-1 "
        >
          <MdRateReview size={16} className="text-rose-600" />
          My Reviews
        </Link>
        <SignOutButton>
          <div
            role="button"
            className="p-2 w-full flex  rounded-lg justify-between items-center text-md font-semibold hover:bg-[#1a1a1a] m-1 "
          >
            <BiLogOut size={18} className="text-gray-600" />
            Sign Out
          </div>
        </SignOutButton>
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
