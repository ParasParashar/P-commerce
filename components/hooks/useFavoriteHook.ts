'use client'
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addProductToFavorite, filterUserFavorite, removeProductFromFavorite } from "@/actions/favorite.action";

type Props = {
    currentUserId: string;
    productId: string;
};

const useFavorite = ({ currentUserId, productId }: Props) => {
    const router = useRouter();
    const [hasFavorited, setHasFavorited] = useState(false);

    const checkFavorite = useCallback(async () => {
        try {
            if (!currentUserId) {
                router.push('/sign-in');
                return false;
            }

            const hasFavorite = await filterUserFavorite(currentUserId, productId);
            setHasFavorited(hasFavorite || false);
            return hasFavorite;
        } catch (error) {
            console.error('Error checking favorite:', error);
            return false;
        }
    }, [currentUserId, productId, router]);

    useEffect(() => {
        checkFavorite();
    }, [checkFavorite]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            if (!currentUserId) {
                router.push('/sign-in');
                return;
            }

            let request;
            if (hasFavorited) {
                request = () => removeProductFromFavorite(productId);
                toast.success('Product removed from wishlist ♥️');
            } else {
                request = () => addProductToFavorite(currentUserId, productId);
                toast.success('Product in your wishlist ♥️');
            }

            await request();
            setHasFavorited((prev) => !prev);
        } catch (error: any) {
            console.error('Something went wrong', error.message);
        }
    }, [currentUserId, hasFavorited, productId, router]);


    return {
        hasFavorited,
        toggleFavorite,
    };
};

export default useFavorite;
