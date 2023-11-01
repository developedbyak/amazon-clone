/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "@/slices/basketSlice";

import { SearchIcon, MenuIcon, ShoppingCartIcon } from "@/assets/icons/icons";

export default function Header() {
    const { data: session } = useSession();
    const router = useRouter();
    const items = useSelector(selectItems);

    return (
        <header>
            {/* ------top------ */}
            <div className="flex items-center bg-amazon_blue px-1 flex-grow py-2">
                <div className=" mt-2 mx-2 flex items-center flex-grow sm:flex-grow-0">
                    <Image
                        onClick={() => router.push("/")}
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        alt="logo"
                        className=" cursor-pointer h-[30px] w-[100px] px-1"
                    />
                </div>
                <div className=" hidden flex-grow cursor-pointer items-center h-10 rounded-md sm:flex bg-yellow-400 hover:bg-yellow-500">
                    <input
                        className=" p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                        type="text"
                    />
                    <SearchIcon />
                </div>
                <div className=" text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
                    {session && (
                        <div
                            className=" cursor-pointer"
                            title="Sign Out"
                            onClick={signOut}
                        >
                            <Image
                                src={session.user.image}
                                width={40}
                                height={40}
                                alt="logo"
                                className=" cursor-pointer rounded-full w-auto h-auto hidden sm:flex"
                            />
                        </div>
                    )}
                    <div
                        className="link"
                        onClick={
                            !session ? () => router.push("/login") : signOut
                        }
                    >
                        <p>
                            {session
                                ? `Hello, ${session.user.name.split(" ")[0]}`
                                : "SignIn"}
                        </p>
                        <p className=" font-extrabold md:text-sm">
                            Account & Lists
                        </p>
                    </div>
                    <div
                        className=" link"
                        onClick={() => router.push("/orders")}
                    >
                        <p>Returns</p>
                        <p className=" font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div
                        onClick={() => router.push("/checkout")}
                        className=" relative link flex items-center gap-1"
                    >
                        <span className=" absolute top-0 right-0 md:right-12 h-4 w-4 bg-yellow-400 text-center rounded-full text-black font-bold">
                            {items.length}
                        </span>

                        <ShoppingCartIcon />
                        <p className=" hidden font-extrabold md:text-sm md:inline mt-2">
                            Basket
                        </p>
                    </div>
                </div>
            </div>
            {/* ------bottom------ */}
            <div className=" flex items-center bg-amazon_blue-light text-white text-sm gap-3 p-2 pl-6">
                {/* <p className=" link flex items-center gap-1">
                    <MenuIcon />
                    All
                </p> */}
                <p className=" link">Prime Video</p>
                <p className=" link">Amazon Business</p>
                <p className=" link">Today&apos;s Deals</p>
                <p className=" link hidden md:inline-flex">Electronics</p>
                <p className=" link hidden md:inline-flex">Food & Grocery</p>
                <p className=" link hidden md:inline-flex">Prime</p>
                <p className=" link hidden lg:inline-flex">Buy Again</p>
                <p className=" link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className=" link hidden lg:inline-flex">
                    Health & Personal Care
                </p>
            </div>
        </header>
    );
}
