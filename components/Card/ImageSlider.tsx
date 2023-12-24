"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FeaturedProducts, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  products: FeaturedProducts &
    {
      product: Product;
    }[];
};

const ImageSlider = ({ products }: Props) => {
  return (
    <div className="carousel-container themes p-6">
      <Carousel
        infiniteLoop={true}
        autoPlay={true}
        showStatus={false}
        showThumbs={false}
        stopOnHover={false}
        className="carousel"
      >
        {products?.map((item) => (
          <div
            key={item.product.id}
            className="carousel-item themes2 p-2 rounded-lg shadow-md"
          >
            <Link href={`/product/${item.product.id}`}>
              <div className="carousel-content">
                <Image
                  src={item.product.image[0]}
                  alt={item.product.name}
                  width={400}
                  height={400}
                  objectFit="contain"
                  className="rounded-lg"
                />
                <h2 className="text-lg font-semibold mt-2">
                  {item.product.name}
                </h2>
                <p className="text-gray-300">
                  {item.specialDescription.toUpperCase()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
