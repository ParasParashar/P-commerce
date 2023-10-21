"use client";
import { useState } from "react";
import { Input } from "../ui/input";
//@ts-ignore
import StarRatings from "react-star-ratings";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { createReview } from "@/actions/reviews.action";
import { Textarea } from "../ui/textarea";

type props = {
  productId: string;
};

const ReviewInput = ({ productId }: props) => {
  const [review, setReview] = useState("");
  const router = useRouter();
  const [rating, setRating] = useState(0);

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      review: review,
      rating: rating,
      productId: productId,
    };
    await createReview(data);
    router.refresh();
    toast.success("Review Created");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col gap-1 w-full bg-[#0e0d0d] px-3 p-2 rounded-lg"
    >
      <h5 className="text-xl font-bold text-fuchsia-300">
        Create a Product Review
      </h5>
      <Textarea
        id="review"
        value={review}
        rows={4}
        onChange={(e) => setReview(e.target.value)}
        autoComplete="off"
        placeholder="This is the best product in this price range"
        className="w-full rounded-lg p-1 focus:outline-none border-none text-emerald-50 bg-[#131313]"
        required
      />
      <div className="flex items-center">
        <h2 className="font-semibold text-lg text-gray-300">Rate It :</h2>
        <StarRatings
          rating={rating}
          starRatedColor="gold"
          changeRating={handleRatingChange}
          numberOfStars={5}
          name="rating"
          starSpacing="2px"
          starDimension="30px"
        />
      </div>
      <Button
        className="hover:rounded-full rounded-lg text-white transition bg-rose-700 px-4 py-2 w-20 ml-auto "
        size={"sm"}
        onClick={(e)=>onSubmit}
      >
        Submit
      </Button>
    </form>
  );
};

export default ReviewInput;
