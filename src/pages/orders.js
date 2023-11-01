import React from "react";
import Head from "next/head";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";

import Header from "@/components/Header";
import Order from "@/components/Order";
import db from "../../firebase/firebase";

const Orders = ({ orders }) => {
    const { data: session } = useSession();

    return (
        <div>
            <Head>
                <title>Your Orders</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="icon"
                    href="https://cdn.discordapp.com/attachments/1107573460584124427/1108680816114024458/amazon_PNG5.png"
                />
            </Head>
            <Header />
            <main className="max-w-screen-lg mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
                    Your orders
                </h1>
                {session ? (
                    <h2> {orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders</h2>
                )}

                <div className="mt-5 space-y-4">
                    {orders?.map((order) => (
                        <Order
                            key={order.id}
                            id={order.id}
                            amount={order.amount}
                            amountShipping={order.amountShipping}
                            images={order.images}
                            timeStamp={order.timestamp}
                            items={order.items}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Orders;

export async function getServerSideProps(context) {
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    // Firebase db - to get all orders
    const stripeOrders = await db
        .collection("users")
        .doc(session.user.email)
        .collection("orders")
        .orderBy("timeStamp", "desc")
        .get();

    // Stripe orders -
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timestamp: moment(order.data().timeStamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100,
                })
            ).data,
        }))
    );
    return {
        props: {
            orders: orders,
            session: session,
        },
    };
}
