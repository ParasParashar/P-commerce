'use server'
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs";

export async function getFeaturedProducts() {
    try {
        const products = await db.featuredProducts.findMany({
            where: {
                product: {
                    isPublised: true
                }
            },
            include: {
                product: true
            }
        });
        return products;
    } catch (error) {
        console.log('Featured Products error')
    }
}

export async function getAllProducts() {
    try {
        const products = await db.product.findMany({
            where: {
                isPublised: true,
            },
            take:5,
            orderBy:{
                price:'desc'
            }
        });
        return products;
    } catch (error) {
        console.log(' Products error')
    }
}

export async function getSpecificProduct(productId: string) {
    try {
        const product = await db.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                category: true,
                properties: true,
                seller: true,
                reviews:true
            }
        });
        return product;
    } catch (error) {
        console.log('specific Products error')
    }
}

export async function getUserCart() {
    try {
        const { userId } = auth();
        if (!userId) throw new Error('User Id not found');
        const user = await db.clientUser.findFirst({
            where: {
                authUserId: userId,
            },
            include: {
                cart: {
                    include: {
                        CartItem:{
                            include:{
                                product:true
                            }
                        }
                    }
                }
            }
        })
        if (!user) return null;
        // const cartItem = user.cart.map((item)=>item.CartItem);
        const cartItems = user.cart[0].CartItem;
       
        return cartItems;
    } catch (error:any) {
        console.log('User cart Products error',error.message)
    }
}

export async function getRelatedProducts(productCategoryId:string,productId:string) {
    try {
        const related = await db.product.findMany({
            where:{
                categoryId:productCategoryId,
                id:{
                    not:productId
                }
            },
        });
        return related;
        
    } catch (error) {
        console.log('related products errror');
    }
    
}