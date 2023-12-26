"use client";
import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="h-72 w-full flex flex-col transition-all  rounded-lg shadow-lg justify-between p-2 bg-[#080808] ">
      <Skeleton className="h-40  w-auto " />
      <Skeleton className="h-8 w-full rounded-md " />
      <div className="flex justify-between ">
        <Skeleton className="h-6 w-20 rounded-full " />
        <Skeleton className="h-6 w-6 rounded-lg " />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
