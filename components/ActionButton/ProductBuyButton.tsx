"use client";
import { CartItem, Product } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type props = {
  cartItems: CartItem &
    {
      product: Product;
    }[];
};

const ProductBuyButton = ({ cartItems }: props) => {
  const router = useRouter();
  const buyButton = async () => {
    try {
      await axios.post("/api/checkout", cartItems).then((res) => {
        router.push(res.data);
        toast.success("Order Created");
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Button
      onClick={buyButton}
      className="bg-blue-500 rounded-full text-lg text-black p-2"
    >
      Buy
    </Button>
  );
};

export default ProductBuyButton;
