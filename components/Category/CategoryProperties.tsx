"use client";
import qs from "query-string";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductProperties } from "@prisma/client";

type props = {
  properties: ProductProperties[];
};

const CategoryProperties = ({ properties }: props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search");
  const categoryValue = searchParams.get("category");
  const propertyValue = searchParams.get("propertySearch") || "";
  const handleCategoryClick = (productName: string, productValue: string) => {
    const existingDynamicProperty = propertyValue
      ? JSON.parse(propertyValue)
      : {};
    existingDynamicProperty[productName] = productValue;
    const dynamicProperty = JSON.stringify(existingDynamicProperty);
    const url = qs.stringifyUrl({
      url: "/search",
      query: {
        search: searchValue,
        category: categoryValue,
        propertySearch: dynamicProperty,
      },
    });
    router.push(url);
  };

  return (
    <div className="flex items-center overflow-x-auto mt-3 gap-x-2">
      {properties?.map((data: any) => (
        <div key={data.id}>
          <div className="themes rounded-lg p-2 text-lg text-white flex items-center gap-x-2 overflow-x-auto">
            <p className="text-sm font-bold text-sky-300 "> {data.name}</p>
            <Select
              onValueChange={(value) => handleCategoryClick(data.name, value)}
            >
              <SelectTrigger className="w-[100px] themes2 focus:outline-none">
                <SelectValue placeholder="Select " />
              </SelectTrigger>
              <SelectContent className="themes2 text-white z-40">
                <SelectGroup>
                  <SelectLabel>Properties</SelectLabel>
                  {data.value.map((id: any) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryProperties;
