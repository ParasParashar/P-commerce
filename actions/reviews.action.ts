'use server'
import { db } from "@/lib/db";
import { fetchUser } from "./user.action";
type reviewProps={
        review:string,
        rating:number,
        productId:string
    
};

export async function getProductReviews(productId:string) {
    try {
        const review = await db.productReviews.findMany({
            where:{
                productId:productId
            },
            include:{
                user:true
            },
            orderBy:{
                createdBy:'desc'
            }
        });
        return review;
    } catch (error) {
        console.log('review error');
    }
    
}

export async function createReview({ review, rating, productId }:reviewProps) {
    try {
      const user = await fetchUser();
      if (!user) throw new Error('User not found');
      console.log(review,rating,productId)
      const reviews = await db.productReviews.create({
        data: {
          productId: productId,
          review: review,
          ratings: rating,
          userId: user.id,
          createdBy: new Date()
        },
      });
      return reviews;
    } catch (error) {
      console.log('Review error:', error);
    }
  }
  