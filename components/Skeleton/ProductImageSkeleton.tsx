"use client";

import { Skeleton } from "../ui/skeleton";

const ProductImageSkeleton = () => {
  return (
    <div className="flex gap-2 ">
      <div className="max-w-24 gap-1 flex flex-col overflow-hidden object-contain items-center transition-all  relative p-1 ">
        <div className="w-20 h-20  max-sm:w-14 max-sm:h-14">
          <Skeleton className="rounded-lg h-full w-full" />
        </div>
      </div>
      <div className="w-2/3 ">
        <div className="flex relative rounded-sm  aspect-square justify-center">
          <Skeleton className="rounded-md w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductImageSkeleton;
