"use client";
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavoriteHook";
import { usePathname } from "next/navigation";

type props = {
  currentUserId: string;
  productId: string;
};

const HeartButton = ({ currentUserId, productId }: props) => {
  const pathName = usePathname();
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hasFavorited, toggleFavorite } = useFavorite({
    currentUserId,
    productId,
  });
  useEffect(() => {
    setFavorite(hasFavorited);
    setLoading(false);
  }, [hasFavorited, pathName]);

  return (
    <div
      onClick={toggleFavorite}
      className="hover:opacity-80 p-1 rounded-full cursor-pointer"
    >
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {favorite ? (
            <AiFillHeart size={30} className="text-rose-500" />
          ) : (
            <AiOutlineHeart
              size={30}
              className="text-gray-200 hover:opacity-80"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default HeartButton;
