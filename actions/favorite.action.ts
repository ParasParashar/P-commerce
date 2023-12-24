'use server'

import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { fetchUser } from "./user.action";

export async function filterUserFavorite(currentUserId: string, productId: string) {
    try {
        const user = await currentUser();
        if (!user) {
            console.log('User not found');
            throw new Error('User not found');
        }
        const userData = await db.clientUser.findFirst({
            where: {
                authUserId: currentUserId
            }
        });
        let userInfo: any;
        if (!userData) {
            const userCreate = await db.clientUser.create({
                data: {
                    authUserId: user.id,
                    name: user.firstName,
                }
            })
            userInfo = userCreate
        } else {
            userInfo = userData;
        }
        const isProductFavorite = userInfo.favoriteProductIds.includes(productId);
        return isProductFavorite

    } catch (error: any) {
        console.log('Error in filter user Favorite', error.message);
    }
}

export async function addProductToFavorite(currentUserId: string, productId: string) {
    try {
        const user = await fetchUser();
        if (!user) {
            console.log('user not found');
            throw new Error('User not found');
        }
        const existingFavoriteId = await filterUserFavorite(currentUserId, productId)

        if (!existingFavoriteId) {
            await db.clientUser.update({
                where: {
                    id: user?.id
                },
                data: {
                    favoriteProductIds: {
                        push: productId
                    }
                }
            });
        }
    } catch (error: any) {
        console.log('Error adding to favorites', error.message);
    }
}



export async function removeProductFromFavorite(productId: string) {
    try {
        const user = await fetchUser();
        if (!user) {
            console.log('user not found')
            throw new Error('User not found');
        };
        await db.clientUser.update({
            where: {
                id: user.id
            },
            data: {
                favoriteProductIds: user.favoriteProductIds.filter(item => item !== productId)
            }
        });

    } catch (error: any) {
        console.log('delete favoreite error', error.message)
    }

}