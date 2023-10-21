"use client";
import StarRatings from "react-star-ratings";
type props = {
  ratings: number;
  type?: "small";
};
const ShowRatingBox = ({ ratings, type }: props) => {
  return (
    <StarRatings
      rating={ratings}
      starRatedColor="gold"
      numberOfStars={5}
      name="rating"
      starSpacing="2px"
      starDimension={type ? "20px" : "30px"}
      //@ts-ignore
      isSelectable={false}
      isAggregateRating={true}
    />
  );
};

export default ShowRatingBox;
