"use client";
import { useSearchParams } from "next/navigation";
import { IoMdShareAlt } from "react-icons/io";
import { Button } from "../ui/button";
type props = {
  productURL: string;
};

function ShareButton() {
  const searchParams = useSearchParams();
  const productURL =
    window.location.origin +
    window.location.pathname +
    "?" +
    searchParams.toString();
    
  const shareProduct = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this product",
          text: "I found a great product on P-Commerce app!",
          url: productURL,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = productURL;
      document.body.appendChild(textArea);
      textArea.select();
      document.body.removeChild(textArea);
      alert("URL copied to clipboard");
    }
  };

  return (
    <div onClick={shareProduct} className="hover:bg-[#292b2d] rounded-full  cursor-pointer transition-colors p-1">
      <IoMdShareAlt size={35} className="text-blue-400" />
    </div>
  );
}

export default ShareButton;
