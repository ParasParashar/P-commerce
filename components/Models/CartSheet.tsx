"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import Logo from "../Navbar/Logo";
import Image from "next/image";
import CartProductAction from "../ActionButton/CartProductAction";
import { getUserCart } from "@/actions/products.action";
import { CartItem, Product } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader, ShoppingBasket } from "lucide-react";
import { Button } from "../ui/button";
import useCartHook from "../hooks/useCartHook";

type itemType = CartItem & {
  product: Product & { price: null | number };
};

const CartSheet = ({ children }: { children?: React.ReactNode }) => {
  const cartReload = useCartHook();
  const [isLoading, setIsLoading] = useState(false);
  const [cartItems, setCartItems] = useState<itemType[]>([]);
  const router = useRouter();
  const fetchUserCart = async () => {
    setIsLoading(true);
    const cart = (await getUserCart()) as itemType[];
    setCartItems(cart);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchUserCart();
  }, [cartReload.isOpen, cartReload.isReload]);

  const totalPrice = cartItems?.reduce(
    (total, data) => total + (data.product.price || 0) * data.quantity,
    0
  );

  return (
    <Sheet open={cartReload.isOpen} onOpenChange={cartReload.onClose}>
      <SheetContent side={"right"} className="themes max-sm:w-full">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1 text-xl text-gray-500">
            <Logo />
            My Cart
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <div>
            {isLoading ? (
              <div className="h-[40vh] flex flex-col justify-center w-full items-center">
                <Loader className="animate-spin h-6 w-6" />
              </div>
            ) : (
              <div className="flex items-center w-full flex-col justify-between h-full flex-grow">
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
                            <p
                              key={propertyName}
                              className="flex flex-wrap text-sm"
                            >
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
                  <div className="flex h-[80vh] w-full items-center justify-center gap-2">
                    <p className="text-xl  text-center text-gray-400">
                      Your cart is empty
                    </p>
                    <ShoppingBasket className="h-5 w-5 " />
                  </div>
                ) : (
                  <div className="border-t-[3px] absolute bottom-0 right-0 left-0 border-[#404040]  z-10  flex flex-col gap-y-3">
                    <p className="text-lg p-4 font-bold flex justify-between items-center">
                      Total Price
                      <span>${totalPrice}</span>
                    </p>
                    <div className=" border-t-[3px] p-4 border-[#404040]">
                      <Button
                        onClick={() => router.push("/checkout")}
                        className="w-full bg-blue-500 text-white rounded-full"
                      >
                        Proceed to checkout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
