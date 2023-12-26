"use client";

import { Skeleton } from "../ui/skeleton";

const ProductDetailsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4   ">
      <Skeleton className="h-10  mt-3 w-2/3 rounded-lg" />
      <Skeleton className="h-8  mt-2 w-1/2 rounded-lg" />
      <Skeleton className="h-5 w-1/3 rounded-md" />

      <div className="flex items-center text-lg text-slate-300">
        <Skeleton className="h-8 rounded-lg w-1/2 " />
      </div>

      <div className="mt-4">
        <Skeleton className="h-6 w-20 rounded-md" />
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
