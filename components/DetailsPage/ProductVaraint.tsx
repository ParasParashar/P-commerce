"use client";
import { Product, ProductProperties } from "@prisma/client";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CartSheet from "../Models/CartSheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import useCartHook from "../hooks/cartHook";

type Props = {
  product: Product & {
    properties: ProductProperties[];
  };
};

const ProductVariant = ({ product }: Props) => {
  const cartReload= useCartHook();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const allPropertiesSelected = () => {
    return product.properties.every((property) =>
      searchParams.get(property.name)
    );
  };

  const handleVariantSelection = (property: string, value: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(property, value);
    router.push(`?${currentParams.toString()}`);
  };

  const handleAddToCart = async () => {
    try {
      setIsloading(true);
      const dynamicProperties: any = {};
      product.properties.forEach((property) => {
        const paramName = property.name;
        const paramValue = searchParams.get(paramName);
        dynamicProperties[paramName] = paramValue;
      });
      const data = {
        productId: product.id,
        dynamicProperties: dynamicProperties,
      };
      await axios.post("/api/addToCart", data);
      cartReload.onToggle();
      toast.success("Item Added to Cart 🛒");
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error");
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="p-4 m-4 flex flex-col gap-3 themes2 rounded-3xl shadow-md">
      <h2 className="text-lg text-center font-semibold text-white mb-2">
        Select a Variant
      </h2>
      <ul className="flex flex-col gap-2">
        {product.properties.map((property, index) => {
          const params = searchParams.get(property.name) || "";
          return (
            <li key={index} className="flex flex-col gap-2">
              <strong className="text-gray-400">
                {property.name.toUpperCase()}:{" "}
              </strong>
              <div className="flex flex-wrap gap-2">
                {property.value.map((data,index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={(e) => handleVariantSelection(property.name, data,e)}
                    className={cn(
                      "text-white rounded-full px-3 py-1 hover:bg-sky-500/80 transition duration-300 border",
                      params === data
                        ? "border-blue-600  border-[2px] hover:bg-blue-600"
                        : "bg-sky-300/50"
                    )}
                  >
                    {data.toUpperCase()}
                  </Button>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
      <CartSheet>
        <Button
          disabled={!allPropertiesSelected() || isloading}
          onClick={handleAddToCart}
          className="bg-red-500 rounded-full w-full text-lg font-bold p-2"
        >
          Add To Cart
        </Button>
      </CartSheet>
    </div>
  );
};

export default ProductVariant;
