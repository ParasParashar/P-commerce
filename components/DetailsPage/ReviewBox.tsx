import { getProductReviews } from "@/actions/reviews.action";
import ReviewInput from "./ReviewInput";
import ShowRatingBox from "./ShowRatingBox";

type props = {
  productId: string;
};
const ReviewBox = async ({ productId }: props) => {
  const reviews = await getProductReviews(productId);
  if(!reviews){
    return(
        <div>No review found </div>
    )
    }
     
  return (
    <div className="grid grid-cols-1 md:grid-cols-[0.8fr,1.2fr] gap-3">
      <ReviewInput productId={productId} />
      {reviews?.length > 0 && (
        <div className="flex flex-col bg-[#080808] rounded-lg gap-2 p-2">
          <h5 className="text-xl font-semibold text-fuchsia-200">
            Products Reviews
          </h5>
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="flex flex-col gap-1 border-b-[2px] border-[#262626] p-1"
            >
              <p className="text-lg">{review.review}</p>
              <div className="flex items-center">
                <h4 className="font-semibold text-lg text-gray-200">
                  User Ratings:
                </h4>
                <ShowRatingBox ratings={review.ratings} />
              </div>
              <div className="flex flex-col  items-end text-md">
                <p className="text-lg text-gray-300">{review.user.name}</p>
                <p className="text-md text-gray-400">{review.user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewBox;
