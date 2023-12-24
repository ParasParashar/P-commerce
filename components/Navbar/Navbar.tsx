"use client";
import { Menu, ShoppingCart } from "lucide-react";
import Logo from "./Logo";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";
import SideBarSheet from "../Models/SideBarSheet";
import Link from "next/link";
import NavbarRoutes from "./NavbarRoutes";
import Search from "./Search";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import useCartHook from "../hooks/useCartHook";

const Navbar = () => {
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
    <div className="flex flex-col">
      <div
        className={cn(
          "themes flex items-center justify-between px-2 ",
          show
            ? "md:fixed z-50 transition-all animate duration-1000 top-0 left-0 md:px-10 right-0 "
            : ""
        )}
      >
        <SideBarSheet>
          <Button variant={"outline"} size={"sm"} className="block md:hidden">
            <Menu className="h-5 w-5 text-white" />
          </Button>
        </SideBarSheet>
        <div className="flex items-center gap-2">
          <Logo />
          <NavbarRoutes />
        </div>
        <div className="hidden  md:block w-1/2">
          <Search />
        </div>
        <div className="flex gap-3 items-center">
          <UserButton />

          <Button onClick={cartSheet.onOpen} variant={"outline"} size={"sm"}>
            <ShoppingCart className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "md:hidden flex items-center justify-between w-full themes p-1",
          show ? "fixed top-0 left-0 p-2 z-30 transition-all duration-700 " : ""
        )}
      >
        {show && (
          <Link href={"/"}>
            <Logo />
          </Link>
        )}
        <div className="w-full">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
