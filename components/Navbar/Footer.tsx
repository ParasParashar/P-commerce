import Link from "next/link";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div className="p-4 transition-all duration-1000 bg-gray-800 text-neutral-300 ">
      <div className="container mx-auto gap-3 flex flex-col md:flex-row justify-between items-center">
        <p className="text-lg max-sm:text-sm md:text-2xl font-bold">
          &copy; CopyRight by Paras Parashar {new Date().getFullYear()}
        </p>
        <Button className="text-lg px-4 py-2 rounded-full text-white  hover:opacity-80 bg-sky-500">
          <Link href={'https://p-commerce-admin.vercel.app/'} target="_blank">
          Become a Seller
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Footer;
