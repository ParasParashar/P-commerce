"use client";
import { X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Logo from "../Navbar/Logo";
import { routes2 } from "@/lib/routes";
import NavBarItem from "../Navbar/NavItem";

const SideBarSheet = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"} className="themes">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <div className="flex w-full flex-col gap-2">
            {routes2.map((item: any) => (
              <NavBarItem
                key={item.name}
                name={item.name}
                href={item.route}
                icon={item.icon}
                type="sidebar"
              />
            ))}
          </div>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default SideBarSheet;
