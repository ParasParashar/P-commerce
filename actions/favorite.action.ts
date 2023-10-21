'use server'

import { currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { fetchUser } from "./user.action";
import { create } from "domain";

type props = {
    currentUserId: string;
    productId: string;
}
export async function filterUserFavorite(currentUserId: string, productId: string) {
    try {
        const user = await currentUser();
        if (!user) throw new Error('User Not found');
        const userData = await db.clientUser.findFirst({
            where: {
                authUserId: currentUserId
            },
            include: {
                favorites: true
            }
        });
        let userInfo: any;
        if (!userData) {
            const userCreate = await db.clientUser.create({
                data: {
                    authUserId: user.id,
                    name: user.firstName,
                },
                include: {
                    favorites: true
                }
            })
            userInfo = userCreate
        } else {
            userInfo = userData;
        }

        const favoriteEntry = await db.favoriteProduct.findFirst({
            where: {
                userId: userInfo.id,
                productId: productId,
            },
        });
        return !!favoriteEntry;

    } catch (error: any) {
        console.log('Something went wrong', error.message)
    }

}

export async function addProductToFavorite(currentUserId: string, productId: string) {
    try {

        const user = await fetchUser();
        if (!user) throw new Error('user not found');
        const hasFavorite = await filterUserFavorite(currentUserId, productId);
        if (!hasFavorite) {
            await db.favoriteProduct.create({
                data: {
                    productId: productId,
                    userId: user.id
                }
            })
        }
    } catch (error: any) {
        console.log('error favorite upgrage', error.message)
    };

}

export async function removeProductFromFavorite(productId: string) {
    try {
        const user = await fetchUser();
        if (!user) throw new Error('user not found');
        await db.favoriteProduct.delete({
            where: {
                productId: productId,
                userId: user.id
            }
        });

    } catch (error: any) {
        console.log('delete favoreite error', error.message)
    }

}