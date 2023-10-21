"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type categoryitemProps = {
  name: string;
};
const CategoryItem = ({ name }: categoryitemProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const searchProductName = searchParams.get("search");
  const isCategorySelected = categoryName === name;
  const handleClick = () => {
    const url = qs.stringifyUrl({
      url: '/search',
      query: {
        category: isCategorySelected ? name : name,
      },
    });
    router.push(url);
  };
  return (
    <Button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-x-1 rounded-full p-2 border hover:border-sky-700 transition themes text-sky-100",
        isCategorySelected && "border-sky-700  text-sky-900"
      )}

    >
        {name}
    </Button>
  );
};

export default CategoryItem;
