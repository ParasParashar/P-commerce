import { userFavoriteProducts } from "@/actions/user.action";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import HeartButton from "../ActionButton/HeartButton";

const UserFavoriteProducts = async () => {
  const { userId } = auth();
  if (!userId) redirect("sign-in");
  const favorites = await userFavoriteProducts();
  if (!favorites || favorites?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <p className="text-sm md:text-lg text-center text-gray-500">
          You don&#39;t have any favorite products!
        </p>
      </div>
    );
  }

  return (
    <div className="px-1 md:px-5 flex flex-col gap-3">
      {favorites?.map((favorite: any) => (
        <div
          key={favorite.id}
          className="flex justify-between items-center  gap-1 border-b-[2px] border-[#151313] p-1 md:p-2 bg-[#1b1a1aea] rounded-lg w-full"
        >
          <Link href={`/product/${favorite.id}`}>
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-32 object-contain">
                <Image
                  src={favorite.image[0]}
                  alt={favorite.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-lg md:text-xl font-semibold text-gray-200">
                  {favorite.name}
                </p>
                <p className="text-sm md:text-lg text-ellipsis text-gray-400">
                  {favorite.description}
                </p>
                <p className="text-lg text-blue-500">${favorite.price}</p>
              </div>
            </div>
          </Link>
          <div className="ml-auto flex items-end">
            <HeartButton currentUserId={userId} productId={favorite.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserFavoriteProducts;
