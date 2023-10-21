import Image from "next/image";
import Link from "next/link";
import { getUserCart } from "@/actions/products.action";
import CartProductAction from "../ActionButton/CartProductAction";
import { Button } from "../ui/button";
import ProductBuyButton from "../ActionButton/ProductBuyButton";
import { CartItem, Product } from "@prisma/client";
type props = {
  cartItems: CartItem &
    {
      product: Product;
    }[];
};

const CartItemProducts = async () => {
  const cartItems = await getUserCart();
  const totalPrice = cartItems?.reduce(
    (total, data) => total + (data.product.price || 0) * data.quantity,
    0
  );
  return (
    <div>
      <div className="flex items-center w-full flex-col justify-between h-full flex-grow bg-[#1e1d1d]  p-2 rounded-lg">
        {cartItems?.map((item, index) => (
          <div
            key={index}
            className="flex  w-full pb-2 border-b border-[#404040] justify-between items-center gap-2"
          >
            <Link
              href={`/product/${item.productId}?${Object.entries(
                item.dynamicProperties as Record<string, string>
              )
                .map(([key, value]) => `${key}=${value}`)
                .join("&")}`}
              className="flex items-center gap-x-5"
            >
              <div className="relative border-[1px] rounded-md border-[#404040] w-16 h-16 mt-2 object-cover">
                <Image
                  src={item.product.image[0]}
                  alt="Product Image"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col items-start">
                <p className="text-lg font-[300] text-ellipsis text">
                  {item.product.name.slice(0, 18)}
                </p>
                <div className="text-md text-gray-400">
                  {Object.entries(
                    item.dynamicProperties as Record<string, string>
                  ).map(([propertyName, propertyValue]) => (
                    <p key={propertyName} className="flex flex-wrap text-sm">
                      {propertyValue.toUpperCase()}
                    </p>
                  ))}
                </div>
              </div>
            </Link>
            <div className="flex flex-col items-end">
              <p className="text-md line-clamp-2">
                ${item?.product?.price || 0 * item.quantity}
              </p>
              <CartProductAction
                productId={item.productId}
                cartItemId={item.id}
                quantity={item.quantity}
              />
            </div>
          </div>
        ))}
        {/* <div className="w-full  "> */}
        {cartItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center  h-full gap-2">
            <p className="text-xl  text-center text-gray-400">
              Your cart is empty
            </p>
          </div>
        ) : (
          <div className="border-t-[3px] flex flex-1 border-[#404040] w-full  flex-col gap-y-3 relative bottom-0 left-0 right-0">
            <p className="text-lg p-4 font-bold flex justify-between items-center">
              Total Price
              <span>${totalPrice}</span>
            </p>
            <ProductBuyButton cartItems={cartItems as any} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItemProducts;
