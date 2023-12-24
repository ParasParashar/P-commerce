"use client";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Button } from "../ui/button";
const Search = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.MouseEvent<HTMLFormElement>) => {
    if (search.length > 0) {
      e.preventDefault();
      const url = qs.stringifyUrl({
        url: "/search",
        query: {
          search: search,
        },
      });
      router.push(url);
    }
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 themes2 p-2 rounded-lg rounded-e-3xl w-full "
    >
      {isSearchActive && <BiSearch size={28} className="text-blue-500 " />}
      <input
        type="text"
        autoComplete="off"
        value={search}
        placeholder="Search Products....Product-Categories....."
        required
        className="themes2 rounded-lg text-lg w-full focus:outline-none p-1"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsSearchActive(true)}
        onBlur={() => setIsSearchActive(false)}
      />
      <Button size={"sm"} onClick={() => handleSearch}>
        <BiSearch size={30} className=" text-themes" />
      </Button>
    </form>
  );
};

export default Search;
