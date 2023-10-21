import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const { productId, dynamicProperties } = await req.json();
        if (!userId) {
            return new NextResponse("User not found", { status: 404 })
        }
        let user;
        // finding the user
        const existingUser = await db.clientUser.findFirst({
            where: {
                authUserId: userId
            },
            include: {
                cart: true
            }
        });
        if (!existingUser) {
            // if not user creating it
            const newUser = await db.clientUser.create({
                data: {
                    authUserId: userId,
                    cart: {
                        create: {},
                    }
                },
                include: {
                    cart: true
                }
            });
            user = newUser;
        } else {
            user = existingUser;
        }

        // finding the cart of the user
        const userCart = await db.cart.findFirst({
            where: {
                userId: user.id
            },
            include: {
                CartItem: true
            }
        });
        if (!userCart) return null;

        // finding exing product in cartItme in user cart 
        const existingCartItem = userCart.CartItem?.find(
            (item: any) => item.productId === productId
        );
        // if exingting then add one more item.
        if (existingCartItem) {
            await db.cartItem.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: existingCartItem.quantity + 1,
                    dynamicProperties: dynamicProperties
                }
            })
        } else {
            // if not existing then create item
            await db.cartItem.create({
                data: {
                    cartId: userCart.id,
                    productId: productId,
                    quantity: 1,
                    dynamicProperties: dynamicProperties
                }
            })
        }
        return new NextResponse('lsj')
    } catch (error: any) {
        console.log(error.message)
        return new NextResponse("Add to cart error", { status: 500 })
    }

}