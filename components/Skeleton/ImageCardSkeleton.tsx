"use client";

import { Skeleton } from "../ui/skeleton";

const ImageCardSkeleton = () => {
  return (
    <div className="p-6 w-full h-full flex flex-col transition-all  rounded-lg shadow-lg  opacity-80 justify-between  bg-[#080808] ">
      <div className=" rounded-lg shadow-md">
        <Skeleton className="h-[400px] w-auto bg-[#191818]" />
        <Skeleton className="mt-6 h-8 rounded-lg w-full bg-[#191818]" />
        <Skeleton className="mt-2 h-6 rounded-lg  w-full bg-[#191818]" />
      </div>
    </div>
  );
};

export default ImageCardSkeleton;
