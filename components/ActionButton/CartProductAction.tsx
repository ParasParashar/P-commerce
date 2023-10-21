"use client";
import { decreaseCartItem, increaseCartItem } from "@/actions/cart.action";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useCartHook from "../hooks/cartHook";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import DotsLoader from "../Providers/DotsLoader";
type props = {
  quantity: number;
  productId: string;
  cartItemId: string;
};
const CartProductAction = ({ cartItemId, productId, quantity }: props) => {
  const [loader, setLoader] = useState(false);
  const [loader2, setLoader2] = useState(false);
  const router = useRouter();
  const cartReload = useCartHook();
  const handleDelete = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoader2(true);
      await decreaseCartItem({ cartItemId, productId });
      cartReload.onToggle();
      setLoader2(false);
      router.refresh();
      toast.success("Item Reduced");
    },
    [cartItemId, productId, loader2, cartReload.isOpen, router]
  );
  const handleIncrease = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setLoader(true);
      await increaseCartItem({ cartItemId, productId });
      cartReload.onToggle();
      setLoader(false);
      router.refresh();
      toast.success("Item Increased");
    },
    [cartItemId, productId, loader, cartReload.isOpen, router]
  );

  return (
    <div className="rounded-full border-[1px] border-[#404040] bg-transparent flex items-center gap-x-1">
      <Button
        type="button"
        onClick={handleDelete}
        className="hover:bg-gray-700/60 rounded-l-full "
      >
        {loader2 ? <DotsLoader /> : <Minus />}
      </Button>
      <p className="font-semibold">{quantity}</p>
      <Button
        onClick={handleIncrease}
        className="hover:bg-gray-700/60 rounded-r-full"
      >
        {loader ? <DotsLoader /> : <Plus />}
      </Button>
    </div>
  );
};

export default CartProductAction;
