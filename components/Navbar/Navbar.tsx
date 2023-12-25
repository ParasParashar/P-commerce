"use client";
import { Shapes, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import NavbarRoutes from "./NavbarRoutes";
import Search from "./Search";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useCartHook from "../hooks/useCartHook";
import Profile from "./Profile";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const cartSheet = useCartHook();
  const transitionNavbar = () => {
    if (window.scrollY > 120) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);
  return (
    <div className="flex flex-col relative">
      <div
        className={cn(
          "themes flex relative items-center justify-between px-2 ",
          show
            ? "md:fixed z-50 transition-all animate duration-1000 top-0 left-0 md:px-10 right-0 "
            : ""
        )}
      >
        <Button
          onClick={() => router.push("/categories")}
          variant={"outline"}
          size={"sm"}
          className="block md:hidden"
        >
          <Shapes className="h-5 w-5 text-white" />
          <span className="md:block hidden text-md ">Categories</span>
        </Button>
        <div className="flex items-center gap-2">
          <Logo />
          <NavbarRoutes />
        </div>

        <div className="absolute top-3 left-1/3 hidden md:block  w-1/2 overflow-hidden transition-max-height duration-300 z-50">
          <Search />
        </div>

        <div className="flex gap-3 items-center">
          <Profile />
          <Button onClick={cartSheet.onOpen} variant={"outline"} size={"sm"}>
            <ShoppingCart className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "md:hidden relative flex items-center justify-between w-full themes p-1",
          show
            ? "fixed  top-0 left-0 p-2 z-30 transition-all duration-700 "
            : ""
        )}
      >
        {show && (
          <Link href={"/"} className="transition duration-200">
            <Logo />
          </Link>
        )}
        <div className={cn("w-full ", show ? "" : " ")}>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
