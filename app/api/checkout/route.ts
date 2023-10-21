import { fetchUser } from "@/actions/user.action";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";
import Stripe from "stripe"

export async function POST(req: Request) {
    try {
        const cartItems = await req.json();
        const user = await fetchUser();
        if (!user) {
            return new NextResponse('User not found', { status: 404 })
        }
        const userOrder = await db.orders.create({
            data: {
                clientUserId: user.id,
            }
        });


        //creating line items and orderItems
        let line_item: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
        for (const item of cartItems) {
            const orderItems = await db.orderItem.create({
                data: {
                    productId: item.product.id,
                    quantity: item.quantity,
                    dynamicProperties: item.dynamicProperties,
                    orderId: userOrder.id
                }
            });
            line_item.push({
                quantity: orderItems.quantity,
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: item.product.name,
                    },
                    unit_amount: item.quantity * (item.product?.price || 0) * 100
                }
            });
            //deleting user cartItems 
            await db.cartItem.delete({
                where: {
                    id: item.id
                }
            });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_item,
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}?success=1`,
            cancel_url: `${process.env.NEXT_PUBLIC_PUBLIC_URL}?cancel=1`,
            metadata: { order: userOrder.id.toString(), test: 'Ok' }
        });


        return NextResponse.json(session.url);

    } catch (error) {
        return new NextResponse('Api chekcout error', { status: 500 })
    }

}