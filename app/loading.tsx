"use client";

import ProductCard from "@/components/Card/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-20 w-full  bg-[#1a1a1a] " />
      <div className="p-20 flex-col flex gap-5 ">
        <ProductCard.Skeleton />
        <ProductCard.Skeleton />
      </div>
    </div>
  );
};

export default loading;
//loading code
// "use client";

// import { Rings } from "react-loader-spinner";

// const loading = () => {
//   return (
//     <div className="h-[80vh] bg-neutral-900/10 flex flex-col items-center justify-center ">
//       <Rings
//         height="100"
//         width="100"
//         color="#3f6ed4"
//         radius="10"
//         wrapperStyle={{}}
//         wrapperClass=""
//         visible={true}
//         ariaLabel="rings-loading"
//       />
//     </div>
//   );
// };

// export default loading;
