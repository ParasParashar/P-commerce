import { fetchUser } from "@/actions/user.action";
import BackButton from "@/components/ActionButton/BackButton";
import Logo from "@/components/Navbar/Logo";
import CartItem from "@/components/checkout/CartItem";
import UserInfo from "@/components/checkout/UserInfo";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await fetchUser();
  if (!user?.address) redirect("/onboarding");
  return (
    <div>
      {/* navbar */}
      <div className="flex items-center justify-between">
        <BackButton />
        <h2 className="text-gray-300 text-lg md:text-4xl">Order Summary</h2>
        <Logo />
      </div>
      <div className="grid mt-4  justify-center grid-cols-1 md:grid-cols-2  gap-3">
        <UserInfo
        user={user}
        />
        <CartItem/>
      </div>
    </div>
  );
};

export default page;
