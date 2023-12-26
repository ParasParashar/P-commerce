"use client";

import { Skeleton } from "../ui/skeleton";

const ProductVariantSkeleton = () => {
  return (
    <div className="p-7 m-4 flex flex-col gap-3 bg-[#080808]  rounded-3xl shadow-md">
      <Skeleton className="h-8 w-1/3 rounded-lg" />
      <div className="flex flex-wrap gap-2 p-5">
        <Skeleton className="rounded-full px-3 py-1 h-6 w-12 " />
        <Skeleton className="rounded-full px-3 py-1 h-6 w-12 " />
      </div>
      <Skeleton className=" h-25  rounded-full w-full text-lg font-bold p-2" />
    </div>
  );
};

export default ProductVariantSkeleton;
