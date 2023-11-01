import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    function handleFormChange(e) {
        const { name, value } = e.target;

        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const status = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
            callbackUrl: "/",
        });

        if (!status) return;

        if (!status.error) {
            setForm({
                email: "",
                password: "",
            });
            router.prefetch("/");
            router.push("/");
        } else {
            toast.error(status.error, {
                duration: 2500,
            });
        }
    };

    const signInWithGoogle = async () => {
        signIn("google", { callbackUrl: "http://localhost:3000" });
    };

    return (
        <section className="px-8 flex flex-col gap-4">
            <Toaster />
            <div className=" flex justify-center items-center mt-4">
                <Image
                    onClick={() => router.push("/")}
                    src="https://cdn.discordapp.com/attachments/1107573460584124427/1167115632429518908/AMZN_BIG.D-8fb0be81.png?ex=654cf422&is=653a7f22&hm=0b2d66d2c535742fe0fff9b4e8c0245fe3c74c959a9acb7d8461153c92cf235d&"
                    width={1000}
                    height={1000}
                    alt="logo"
                    className=" cursor-pointer h-auto w-[110px] px-1 invert"
                />
            </div>
            <div className=" max-w-[80%] m-auto">
                <form
                    className="p-6 border-gray-300 border-[1px] rounded-lg flex flex-col gap-4 max-w-[348px]"
                    onSubmit={handleFormSubmit}
                >
                    <h2 className=" text-2xl font-semibold">Sign in</h2>
                    <label
                        htmlFor="email"
                        className=" text-sm font-semibold relative"
                    >
                        Enter your email
                        <input
                            className="p-1 w-full outline-none border-[1px] border-gray-400 rounded-sm mt-1"
                            type="email"
                            value={form.email}
                            name="email"
                            onChange={handleFormChange}
                            required
                        />
                    </label>
                    <label
                        htmlFor="userPassword"
                        className=" text-sm font-semibold relative"
                    >
                        Enter your password
                        <input
                            className="p-1 w-full outline-none border-[1px] border-gray-400 rounded-sm mt-1"
                            type="password"
                            value={form.password}
                            name="password"
                            onChange={handleFormChange}
                            required
                        />
                        <p className=" text-red-500 text-xs mt-2 absolute bottom-[-20px] hidden">
                            Email or Password is wrong!
                        </p>
                    </label>
                    <button
                        className=" bg-[#fcd425] rounded-lg text-xs py-2 mt-4 hover:bg-[#f7ca00] font-semibold"
                        type="submit"
                    >
                        Continue
                    </button>
                    <button
                        onClick={signInWithGoogle}
                        className=" bg-blue-400 rounded-lg text-xs py-2 text-white font-semibold hover:bg-blue-500"
                        type="button"
                    >
                        Sign in with google
                    </button>
                    <p className=" text-xs text-gray-600">
                        By continuing, you agree to Amazon&apos;s{" "}
                        <span className=" text-blue-700 hover:text-yellow-600 hover:underline cursor-pointer">
                            Conditions of Use
                        </span>{" "}
                        and{" "}
                        <span className=" text-blue-700 hover:text-yellow-600 hover:underline cursor-pointer">
                            Privacy Notice.
                        </span>
                    </p>

                    <div className="w-full h-[1px] bg-gray-300 mt-4" />

                    <div className="text-sm">
                        <p className=" font-semibold">Buying for work?</p>
                        <span className=" text-blue-700 text-xs cursor-pointer hover:text-yellow-600 hover:underline">
                            Shop on Amazon Business
                        </span>
                    </div>
                </form>

                <div className=" flex justify-center items-center mt-6">
                    <div className="w-full h-[1px] bg-gray-300 mr-2" />
                    <p className=" text-[11px] whitespace-nowrap font-semibold">
                        New to Amazon?
                    </p>
                    <div className="w-full h-[1px] bg-gray-300 ml-2" />
                </div>
                <button
                    onClick={() => router.push("/signup")}
                    className=" py-1 mt-4 text-[13px] border-[1px] border-gray-300 w-full rounded-lg hover:bg-gray-100"
                >
                    Create your Amazon account
                </button>
            </div>
            <div className=" w-full h-[1px] bg-gray-300 my-4" />
            <div className="flex flex-col gap-4">
                <div className=" w-full flex items-center text-xs text-blue-700 gap-6 justify-center cursor-pointer">
                    <span className="hover:text-yellow-600 hover:underline">
                        Conditions of Use
                    </span>
                    <span className="hover:text-yellow-600 hover:underline">
                        Privacy Notice
                    </span>
                    <span className="hover:text-yellow-600 hover:underline">
                        Help
                    </span>
                </div>
                <p className=" text-[11px] text-gray-600 w-full flex justify-center items-center">
                    © 1996-2023, Amazon.com, Inc. or its affiliates
                </p>
            </div>
        </section>
    );
}
