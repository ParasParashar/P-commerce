import { getUserReview } from "@/actions/user.action";
import ShowRatingBox from "../DetailsPage/ShowRatingBox";
import { Button } from "../ui/button";
import { FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import DeleteReview from "../ActionButton/DeleteReview";

const UserReview = async () => {
  const reviews = await getUserReview();
  if (!reviews || reviews?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <p className="text-sm md:text-lg text-center text-gray-500">
          No Review Found!!
        </p>
      </div>
    );
  }
  return (
    <div className="px-1 md:px-5 flex flex-col gap-3">
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="flex justify-between  gap-1 border-b-[2px] border-[#151313] p-1 md:p-2 bg-[#1b1a1aea] rounded-lg w-full"
        >
          <Link href={`/product/${review.productId}`}>
            <div className="flex items-center gap-3">
              <div className="relative w-32 h-32 object-contain">
                <Image
                  src={review.product.image[0]}
                  alt={review.product.name}
                  fill
                  className="object-contain rounded-md"
                />
              </div>
              <div className="flex flex-col items-start gap-2">
                <p className="text-lg md:text-xl font-semibold text-gray-200">
                  {review.product.name}
                </p>
                <p className="text-sm md:text-lg text-gray-400">
                  {review.review}
                </p>
                <div className="flex items-center">
                  <span className="font-semibold text-sm md:text-lg text-gray-400">
                    Ratings:
                  </span>
                  <ShowRatingBox type="small" ratings={review.ratings} />
                </div>
              </div>
            </div>
          </Link>
          <div className="flex flex-col justify-between items-end text-md">
            <Link href={`/product/${review.productId}`}>
              <FiExternalLink size={30} />
            </Link>
            <DeleteReview reviewId={review.id} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReview;
