"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavoriteHook";

type props = {
  currentUserId: string;
  productId: string;
};

const HeartButton = ({ currentUserId, productId }: props) => {
  const [favorite, setFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { hasFavorited, toggleFavorite } = useFavorite({
    currentUserId,
    productId,
  });

  useEffect(() => {
    setFavorite(hasFavorited);
    setLoading(false);
  }, [hasFavorited]);


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
