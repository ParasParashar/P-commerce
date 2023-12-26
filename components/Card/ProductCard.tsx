"use client";

import Link from "next/link";
import HeartButton from "../ActionButton/HeartButton";
import { Product } from "@prisma/client";
import Image from "next/image";
type props = {
  product: Product;
  currentUserId: string;
};

const ProductCard = ({ product, currentUserId }: props) => {
  return (
    <div className="flex relative w-full min-h-[18rem]    themes rounded-lg shadow-lg flex-col p-2 group">
      <Link href={`/product/${product.id}`}>
        <div className="relative object-contain h-40 max-h-64 w-auto">
          <Image
            src={product.image[0]}
            alt="Product Image"
            fill
            className="object-contain rounded-md group-hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <div className="flex items-center  px-2 justify-start">
        <Link href={`/product/${product.id}`}>
          <div className="flex items-start group-hover:text-blue-500 transition flex-col justify-start gap-1">
            <p className="text-lg flex flex-wrap text-ellipsis  items-center gap-1">
              {product.name.slice(0, 20)}
              {Object.entries(
                product.dynamicProperties as Record<string, string>
              ).map(([key, value]) => (
                <span key={key} className="flex text-xs gap-x-1 flex-wrap">
                  {value}
                </span>
              ))}
            </p>
          </div>
        </Link>
      </div>
      <div className="flex items-center justify-between absolute bottom-0  left-2 right-2">
        <p className="text-md  rounded-full text-fuchsia-100 px-2 bg-blue-500">
          ${product.price}
        </p>
        <HeartButton currentUserId={currentUserId} productId={product.id} />
      </div>
    </div>
  );
};

export default ProductCard;
