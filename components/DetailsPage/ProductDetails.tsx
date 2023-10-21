import { Category, Product, ProductReviews } from "@prisma/client";
import Link from "next/link";
import ShowRatingBox from "./ShowRatingBox";
type Props = {
  product: Product & {
    category: Category;
    reviews: ProductReviews[];
  };
};
const ProductDetails = ({ product }: Props) => {
  const reviewRatings = product.reviews.map((rate) => rate.review);
  const ratings = product.reviews.map((rate) => rate.ratings);
  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce((total, rating) => total + rating, 0);
  const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

  return (
    <div className="flex flex-col gap-4 p-4">
      {ratings.length > 0 && (
        <div className="ml-auto flex items-center">
          <p className="text-sm text-sky-200">Average Ratings;</p>
          <ShowRatingBox ratings={averageRating} />
        </div>
      )}
      <h1 className="text-3xl font-semibold font-sans">{product.name}</h1>
      <p className="text-2xl text-blue-600 font-semibold">${product.price}</p>
      <a href="#review" className="text-sm text-sky-300 cursor-pointer">
        {reviewRatings.length > 0 ? (
          <span className="font-serif">{reviewRatings.length} reviews</span>
        ) : (
          "Be the first one to review this product"
        )}
      </a>

      <div className="flex flex-wrap gap-4">
        {product.dynamicProperties &&
          Object.entries(product.dynamicProperties).map(
            ([key, value], index) => (
              <div
                key={index}
                className="flex items-center text-lg text-slate-300"
              >
                <span className="mr-1 font-semibold">{key.toUpperCase()}:</span>{" "}
                {value.toUpperCase()}
              </div>
            )
          )}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Category</h2>
        <p className="text-blue-500 ">
          {product.category?.name || "Uncategorized"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
