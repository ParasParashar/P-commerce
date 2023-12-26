"use client";

import { Skeleton } from "../ui/skeleton";

const CategoryPropertiesSkeletion = () => {
  return (
    <div className="rounded-lg py-2 p-2 text-lg text-white flex items-center gap-x-2 bg-[#080808] ">
      <Skeleton className="h-5 w-12 rounded-lg bg-[#191818]" />
      <Skeleton className="h-8 w-20 rounded-md bg-[#191818]" />
    </div>
  );
};

export default CategoryPropertiesSkeletion;
