import { fetchUser } from "@/actions/user.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserReview from "@/components/user/UserReview";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { BsFillHeartFill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import UserFavoriteProducts from "@/components/user/userFavorite";
import UserOrders from "@/components/user/UserOrders";
import Link from "next/link";
import { AiFillEdit } from "react-icons/ai";
const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser();
  const userData = {
    name: userInfo?.name || user?.username || "",
    address: userInfo?.address || "",
    email: userInfo?.email || "",
    pincode: userInfo?.pincode || "",
  };
  return ( 
    <div className="p-1 md:p-4 md:px-20 ">
      <div className="flex flex-wrap items-center justify-between gap-2  my-4">
      <div className="flex items-center gap-2 ">
        <div className="relative w-20  h-20  md:w-28 md:h-28 object-cover">
          <Image
            src={user.imageUrl}
            alt="Profile Photo"
            fill
            className="object-cover rounded-full"
          />
        </div>
        <div className="flex items-start flex-col gap-1">
          <h2 className="text-xl text-gray-300 ">{userData.name}</h2>
          <p className="text-md text-fuchsia-500">{userData.email}</p>
        </div>
        </div>
        <Link href={"/onboarding"}>
            <div className=" text-gray-400 w-1/12">
              <AiFillEdit
                className="p-1 cursor-pointer rounded-full hover:bg-[rgb(41,43,45)] "
                size={30}
              />
            </div>
          </Link>
      </div>
      <Tabs defaultValue="Wishlist">
        <TabsList className="tab max-sm:px-10">
          <TabsTrigger className="tab" value="Orders">
          <TbTruckDelivery size={20} className="text-rose-600"/>
          <span className="max-sm:text-xs">
          Orders
          </span>
          </TabsTrigger>
          <TabsTrigger className="tab" value="Wishlist">
            <BsFillHeartFill size={20} className="text-rose-600"/>
          <span className="max-sm:text-xs">

            Wishlist
            </span>
          </TabsTrigger>
          <TabsTrigger className="tab" value="Reviews">
          <MdRateReview size={20} className="text-rose-600"/>
          <span className="max-sm:text-xs">
            My Reviews
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Orders">
          <UserOrders/>
        </TabsContent>
        <TabsContent value="Wishlist">
        <UserFavoriteProducts/>
        </TabsContent>
        <TabsContent value="Reviews" >
        <UserReview/>
        </TabsContent>
      </Tabs>
    </div>
  ); 
};

export default page;
