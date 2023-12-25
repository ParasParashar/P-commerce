"use client";
import { BiSearch } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { getAllProductsAndCategory } from "@/actions/category.action";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
const Search = () => {
  const router = useRouter();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [arrayItem, setArrayItem] = useState<{ name: string }[]>([]);

  const fetchData = async () => {
    try {
      const allItems = (await getAllProductsAndCategory()) as any;
      setArrayItem(allItems);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSelect = (search: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: {
          search: search,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    setTimeout(() => {
      setIsSearchActive(false);
    }, 700);
  };

  return (
    <Command
      onBlur={() => setIsSearchActive(false)}
      onFocus={() => setIsSearchActive(true)}
      className="flex  z-[999999] items-center gap-2 themes2 rounded-lg rounded-e-3xl w-full"
    >
      <div className="flex justify-between w-full items-center gap-2 themes2 p-1 rounded-lg rounded-e-3xl">
        {isSearchActive && <BiSearch size={28} className="text-blue-500" />}
        <div className="flex-grow">
          <CommandInput
            onFocus={() => setIsSearchActive(true)}
            onChangeCapture={() => setIsSearchActive(true)}
            className="themes2  text-gray-100 rounded-lg text-lg w-full focus:outline-none p-1"
            placeholder={`Search Products.. ,Category..`}
          />
        </div>

        {!isSearchActive && (
          <BiSearch size={28} className="text-gray-500  mx-2" />
        )}
      </div>
      {isSearchActive && (
        <CommandList className="w-full shadow-lg z-[999999] themes2 sm:max-h-40 max-sm:max-h-32 max-h-44 ">
          <CommandEmpty className="text-lg text-center text-gray-200">
            No results found.
          </CommandEmpty>
          <CommandGroup className="z-[999999] themes2  sm:max-h-40 max-sm:max-h-32 max-h-44 ">
            {arrayItem.map((document) => (
              <CommandItem
                key={document.name}
                value={document.name}
                title={document.name}
                className="bg-[#1a1a1a] cursor-pointer rounded-lg text-xl text-gray-100   my-1 mw-full z-[999999]  p-1"
                onSelect={() => onSelect(document.name)}
              >
                <span>{document.name}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  );
};

export default Search;
