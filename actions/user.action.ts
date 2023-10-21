'use server'
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

interface props {
    name: string;
    address: string;
    email: string;
    pincode: string
}


export async function updateUser({ name, address, email, pincode }: props): Promise<void> {
    try {
        const { userId } = auth();

        if (!userId) {
            throw new Error('User Not found')
        }
        const existingUserInfo = await db.clientUser.findFirst({
            where: {
                authUserId: userId
            }
        });
        if (existingUserInfo) {
            await db.clientUser.update({
                where: {
                    id: existingUserInfo.id
                },
                data: {
                    name: name,
                    address: address,
                    email: email,
                    pincode: pincode
                },
            });
        } else {
            await db.clientUser.create({
                data: {
                    name: name,
                    address: address,
                    email: email,
                    pincode: pincode,
                    authUserId: userId
                },
            })
        }
    } catch (error: any) {
        console.log("Something went wrong update User", error.message)
    }

}

export async function createUser() {
    try {
        const { userId } = auth();

        if (!userId) {
            throw new Error('User Not found')
        }
        const user = await db.clientUser.findFirst({
            where: {
                authUserId: userId
            }
        })
        if(!user){
            await db.clientUser.create({
                data:{
                    authUserId:userId
                }
            })
        }
    } catch (error: any) {
        throw new Error(error);
    };
}
export async function fetchUser() {
    try {
        const { userId } = auth();

        if (!userId) {
            throw new Error('User Not found')
        }
        const user = await db.clientUser.findFirst({
            where: {
                authUserId: userId
            }
        })
        return user;

    } catch (error: any) {
        throw new Error(error);
    };
}

export async function getUserReview() {
    try {
        const user = await fetchUser();
        if (!user) throw new Error('User Not Found');
        const reviews = await db.productReviews.findMany({
            where: {
                userId:user.id
            },
            include:{
                product:{
                    select:{
                        name:true,
                        id:true,
                        image:true,
                        description:true
                    }
                }
            },
            orderBy:{
                createdBy:'desc'
            }
        });
        return reviews;
    } catch (error) {
        console.log('Something went wrong review user')
    }

}
export async function deleteReview(reviewid:string) {
    try {
        const user = await fetchUser();
        if (!user) throw new Error('User Not Found');
       await db.productReviews.delete({
            where: {
                id:reviewid,
                userId:user.id
            },
        });
    } catch (error) {
        console.log('Something went wrong review user')
    }

}
 
export async function userFavoriteProducts() {
    try {
        const user = await fetchUser();
        if(!user) throw new Error("User Not Found");
        const favorite = await db.favoriteProduct.findMany({
            where:{
                userId:user.id
            },
            include:{
                product:true
            }
        })
        return favorite;
        
    } catch (error) {
        console.log('Something went wrong user favorite');
    }
    
}
export async function getUserOrders() {
    try {
        const user = await fetchUser();
        if(!user) throw new Error("User Not Found");
        const orders = await db.orderItem.findMany({
            where:{
                order:{
                    clientUserId:user.id
                }
            },
            include:{
                product:true,
                order:{
                    include:{
                        clientUser:true
                    }
                }
            }
        })
        return orders;
        
    } catch (error) {
        console.log('Something went wrong user favorite');
    }
    
}

