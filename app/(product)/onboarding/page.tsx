import { fetchUser } from "@/actions/user.action";
import BackButton from "@/components/ActionButton/BackButton";
import AccountProfile from "@/components/user/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";

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
    <div className="m-auto w-full flex flex-col gap-2 md:w-1/2">
      <BackButton />
      <h1 className="text-3xl text-white text-center">Onboarding</h1>
      <div className="bg-[#201f1fa8] rounded-lg p-3">
        <AccountProfile user={userData} />
      </div>
    </div>
  );
};

export default page;
