"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SheetClose } from "../ui/sheet";

type props = {
  name: string;
  icon: LucideIcon;
  href: string;
  type: "navbar" | "sidebar";
};

const NavBarItem = ({ icon: Icon, type, name, href }: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  const onClick = () => {
    router.push(href);
  };

  return (
    <>
      {type === "sidebar" && (
        <button
          onClick={onClick}
          type="button"
          className={cn(
            "flex items-center rounded-md gap-x-2 text-slate-500 text-lg font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
            isActive &&
              "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
          )}
        >
          <SheetClose>
            <div className="flex text-themes items-center gap-x-2 py-4">
              <Icon
                size={22}
                className={cn("text-slate-500", isActive && "text-sky-700")}
              />
              {name}
            </div>
          </SheetClose>
        </button>
      )}
      {type === "navbar" && (
        <button
          onClick={onClick}
          type="button"
          className={cn(
            "flex items-center rounded-md gap-x-2 text-slate-500 text-md font-[500]  transition-all hover:text-gray-300, hover:bg-slate-300/20",
            isActive && "text-sky-700 hover:bg-transparent hover:text-sky-700"
          )}
        >
          <div className="flex text-themes items-center gap-x-2 p-2">
            <Icon
              size={22}
              className={cn("text-slate-500", isActive && "text-sky-700")}
            />
            {name}
          </div>
        </button>
      )}
    </>
  );
};

export default NavBarItem;
