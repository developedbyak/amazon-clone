import React from "react";
import Head from "next/head";
import { motion as m } from "framer-motion";
import { useRouter } from "next/router";

import Header from "@/components/Header";
import { CheckCircleIcon } from "@/assets/icons/icons";

const Success = () => {
  const router = useRouter();

  return (
    <div
      className="bg-gray-100 h-screen"
    >
      <Head>
        <title>Success</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href="https://cdn.discordapp.com/attachments/1107573460584124427/1108680816114024458/amazon_PNG5.png"
        />
      </Head>
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div
          className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <m.div
              initial={{ opacity: 0, y: "100%" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
            >
              <CheckCircleIcon />
            </m.div>
            <m.h1
              initial={{ opacity: 0, y: "100%" }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
              className="text-3xl">
              Thank you, Your order has been confirmed!
            </m.h1>
          </div>
          <m.p
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
          >
            Thank you for shopping with us. We&apos;ll send a confirmation on your registered email.
            To check tha status of your order(s)
            please press the <span className=" underline">Go to orders</span> button below
          </m.p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;
