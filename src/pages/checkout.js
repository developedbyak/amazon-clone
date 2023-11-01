import React from "react";
import Header from "@/components/Header";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "@/slices/basketSlice";
import CheckoutProduct from "@/components/CheckoutProduct";
import { useSession, getSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Checkout() {
    const { data: session } = useSession();
    const items = useSelector(selectItems);
    const total = useSelector(selectTotal);

    const createCheckOutSession = async () => {
        const stripe = await stripePromise;

        // Call the backend to create a checkout session...
        const checkoutSession = await axios.post(
            "/api/create-checkout-session",
            {
                items: items,
                email: session.user.email,
            }
        );

        console.log(checkoutSession.data.id);

        // Redirect user/customer to Stripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
        });

        if (result.error) alert(result.error.message);
    };

    return (
        <div className=" bg-gray-100">
            <Head>
                <title>CheckOut-Page</title>
                <link
                    rel="icon"
                    href="https://pngimg.com/uploads/amazon/amazon_PNG5.png"
                />
            </Head>
            <Header />

            <main className="lg:flex max-w-screen-2xl mx-auto">
                <div className=" flex-grow m-5 shadow-sm">
                    <Image
                        src="https://cdn.discordapp.com/attachments/1107573460584124427/1108687161424891935/Billboard_3000x336.jpg"
                        width={1020}
                        height={250}
                        alt="billboard.jpg"
                        placeholder="blur"
                        blurDataURL="https://cdn.discordapp.com/attachments/1107573460584124427/1108687161424891935/Billboard_3000x336.jpg"
                        className="object-contain w-auto h-auto"
                    />

                    <div className="flex flex-col p-5 space-y-10 bg-white">
                        <h1 className="text-3xl border-b pb-4">
                            {items.length === 0
                                ? "Your Amazon Basket is empty"
                                : "Your Shopping Basket"}
                        </h1>

                        {items.map((item, i) => (
                            <CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* RIGHT-SIDE */}
                <div className=" flex flex-col bg-white p-10 shadow-md">
                    {items.length > 0 && (
                        <>
                            <h2 className=" whitespace-nowrap">
                                Subtotal ({items.length}{" "}
                                {items.length > 1 ? "items" : "item"}):{" "}
                                <span className=" font-bold">$ {total}</span>
                            </h2>

                            <button
                                role="link"
                                onClick={createCheckOutSession}
                                disabled={!session}
                                className={`button mt-2 ${
                                    !session &&
                                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                                }`}
                            >
                                {!session
                                    ? "Sign in to checkout"
                                    : "Proceed to checkout"}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    return {
        props: {
            session: session,
        },
    };
}
