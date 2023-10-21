"use client";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

type props = {
  images: string[];
};
const ProductImage = ({ images }: props) => {
  const [posterImage, setPosterImage] = useState<string | null>(null);
  function setImage(img: string) {
    setPosterImage(img);
  }
  return (
    <div className="flex gap-2 ">
      <div className="max-w-24 gap-1 flex flex-col overflow-hidden object-contain items-center transition-all  relative p-1 ">
        {images.map((img) => (
          <div onMouseEnter={()=>setImage(img)} key={img} className="w-20 h-20 relative cursor-pointer max-sm:w-14 max-sm:h-14">
            <Image
              src={img}
              className={`transition-all cursor-pointer rounded-lg p-0.5 ${
                posterImage === img ? "border" : ""
              }`}
              alt="Product Images"
              fill
              onClick={() => setImage(img)}
            />
          </div>
        ))}
      </div>
      <div className="w-2/3 ">
        <div className="flex relative rounded-sm  aspect-square justify-center">
          <Image
            src={posterImage || images[0]}
            className="transition duration-300 rounded-md"
            alt="Product Primary Image"
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default ProductImage;
