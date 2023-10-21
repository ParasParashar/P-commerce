import ShowRatingBox from "../DetailsPage/ShowRatingBox";
import { Button } from "../ui/button";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import { getUserOrders } from "@/actions/user.action";

const UserOrders = async () => {
  const orders = await getUserOrders();
  if (!orders || orders?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <p className="text-sm md:text-lg text-center text-gray-500">
          No order Found!!
        </p>
      </div>
    );
  }
  return (
    <div className="px-1 md:px-5 flex flex-col gap-3">
      {orders?.map((order) => (
        <div
          key={order.id}
          className="flex flex-col md:flex-row justify-between  gap-1 border-b-[2px] border-[#151313] p-1 md:p-2 bg-[#1b1a1aea] rounded-lg w-full"
        >
          <Link href={`/product/${order.productId}`}>
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-32 object-contain">
                <Image
                  src={order.product.image[0]}
                  alt={order.product.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-lg md:text-xl font-semibold text-gray-200">
                  {order.product.name}
                </p>
                <p className="text-base text-fuchsia-400">
                  {Object.entries(
                    order.dynamicProperties as Record<string, string>
                  ).map(([propertyName, propertyValue]) => (
                    <span key={propertyName}>
                      {propertyName}={propertyValue}
                    </span>
                  ))}
                </p>
                <p className="text-base flex items-center gap-x-3 text-fuchsia-400">
                  Quantity&nbsp;{order.quantity}
                  <span className="text-blue-500">${order.product.price}</span>
                </p>
              </div>
            </div>
          </Link>
          <div className="flex flex-row md:flex-col  items-start justify-between">
            <p className="text-lg text-gray-400">
                Order Date&nbsp;
                <span className="font-bold text-gray-200">
                     {new Date(order.order?.createdAt as Date).toDateString()}
                    </span>
            </p>
            <Link href={`/product/${order.productId}/#review`} className="text-sky-500 transition-all hover:text-blue-700">Create a Review of Product</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
