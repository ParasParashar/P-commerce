'use server'

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

type props = {
    cartItemId: string,
    productId: string
}

export async function decreaseCartItem({ cartItemId, productId }: props) {
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
                        CartItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })
        if (!user) throw new Error('User not found');
        const existingCartItem = user.cart[0].CartItem.find(item => item.productId === productId);

        if (!existingCartItem) {
            throw new Error('Cart item not found');
        }

        const updatedQuantity = existingCartItem.quantity - 1;


        if (updatedQuantity < 1) {
            await db.cartItem.delete({
                where: {
                    id: cartItemId,
                    productId: productId
                }
            })
        } else {
            await db.cartItem.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: updatedQuantity
                }
            })
        }

    } catch (error: any) {
        console.log('Something went wrong', error.message);
    }
}
export async function increaseCartItem({ cartItemId, productId }: props) {
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
                        CartItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            }
        })
        if (!user) throw new Error('User not found');

        const existingCartItem = user.cart[0].CartItem.find(item => item.productId === productId);

        if (!existingCartItem) {
            throw new Error('Cart item not found');
        }

        const updatedQuantity = existingCartItem.quantity + 1;

        await db.cartItem.update({
            where: {
                id: existingCartItem.id
            },
            data: {
                quantity: updatedQuantity
            }
        })


    } catch (error: any) {
        console.log('Something went wrong', error.message);
    }
}