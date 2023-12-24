"use client";
import { useSearchParams } from "next/navigation";
import { IoMdShareAlt } from "react-icons/io";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

function ShareButton() {
  const searchParams = useSearchParams();
  const [productURL, setProductURL] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentURL =
        window.location.origin +
        window.location.pathname +
        "?" +
        searchParams.toString();
      setProductURL(currentURL);
    }
  }, [searchParams]);

  const shareProduct = async () => {
    if (productURL) {
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
    }
  };

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={shareProduct}
      className="hover:bg-[#292b2d] rounded-full  cursor-pointer transition-colors p-1"
    >
      <IoMdShareAlt size={35} className="text-blue-400" />
    </Button>
  );
}

export default ShareButton;
