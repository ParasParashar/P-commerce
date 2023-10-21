'use client'
import { addProductToFavorite, filterUserFavorite, removeProductFromFavorite } from "@/actions/favorite.action";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type props = {
    currentUserId: string;
    productId: string;
}

const useFavorite = ({ currentUserId, productId }: props) => {
    const router = useRouter();
    const [hasFavorited, setHasFavorited] = useState(false);

    useEffect(() => {
        async function checkFavorite() {
            try {
                if (!currentUserId) {
                    router.push('/sign-in')
                    return;
                }
                setHasFavorited(false);

                const hasFavorite = await filterUserFavorite(currentUserId, productId);
                setHasFavorited(hasFavorite || false);
            } catch (error) {
                console.error('Error checking favorite:', error);
            }
        }

        checkFavorite();
    }, [currentUserId, productId]);

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        try {
            if (!currentUserId) {
                router.push('/sign-in')
                return;
            }

            let request;
            if (hasFavorited) {
                request = () => removeProductFromFavorite(productId);
                router.refresh();
                toast.success('Product removed from wishlist ♥️')

            } else {
                request = () => addProductToFavorite(currentUserId, productId);
                router.refresh();
                toast.success('Product in your wishlist ♥️')
            }
            await request();
            setHasFavorited(!hasFavorited);
            router.refresh();
        } catch (error: any) {
            throw new Error(`Something Went Wrong: ${error.message}`);
        }
    }, [currentUserId, hasFavorited, productId, router]);

    return {
        hasFavorited,
        toggleFavorite
    };
}

export default useFavorite;
