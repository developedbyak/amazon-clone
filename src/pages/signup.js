import { UserValidateWithMail } from "@/lib/validate";
import { doc, setDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import db from "../../firebase/firebase";
import { hash } from "bcryptjs";

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPass: "",
    });
    const [invalid, setInvalid] = useState(false);
    const [userExists, setUserExists] = useState(false);

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
        if (form.password != form.confirmPass) {
            setInvalid(true);
            return;
        } else {
            setInvalid(false);
            try {
                const userId = uuidv4();
                const userRef = doc(db, "users", form.email);
                const isUser = await UserValidateWithMail(form.email);
                if (isUser) {
                    setUserExists(true);
                    return;
                } else {
                    setUserExists(false);
                    const hashPassword = await hash(form.password, 10);
                    const updatedData = {
                        id: userId,
                        name: form.name,
                        email: form.email,
                        password: hashPassword,
                        image: "https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg",
                        provider: "credentials",
                    };
                    await setDoc(userRef, updatedData)
                        .then(() => {
                            setForm({
                                name: "",
                                email: "",
                                password: "",
                                confirmPass: "",
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    router.push("/login");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <section className="px-8 flex flex-col gap-4">
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
                    <h2 className=" text-2xl font-semibold">Create account</h2>
                    <label
                        htmlFor="userName"
                        className=" text-sm font-semibold relative"
                    >
                        Your name
                        <input
                            className="p-1 w-full outline-none border-[1px] border-gray-400 rounded-sm mt-1"
                            type="text"
                            value={form.name}
                            name="name"
                            onChange={handleFormChange}
                            required
                        />
                    </label>
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
                        {userExists && (
                            <p className=" text-red-500 text-xs mt-2 absolute bottom-[-20px]">
                                Already have an account with this email
                            </p>
                        )}
                    </label>
                    <label
                        htmlFor="userPassword"
                        className=" text-sm font-semibold relative mt-2"
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
                    </label>
                    <label
                        htmlFor="userPassword"
                        className=" text-sm font-semibold relative"
                    >
                        Re-enter password
                        <input
                            className="p-1 w-full outline-none border-[1px] border-gray-400 rounded-sm mt-1"
                            type="text"
                            value={form.confirmPass}
                            name="confirmPass"
                            onChange={handleFormChange}
                            required
                        />
                        {invalid && (
                            <p className=" text-red-500 text-xs mt-2 absolute bottom-[-20px]">
                                password didn&apos;t match
                            </p>
                        )}
                    </label>
                    <button
                        className=" bg-[#fcd425] rounded-lg text-xs py-2 mt-4 hover:bg-[#f7ca00]"
                        type="submit"
                    >
                        Continue
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
                        <div className="flex gap-1 items-center">
                            <p>Already have an account?</p>
                            <span
                                onClick={() => router.push("/login")}
                                className="text-blue-700 cursor-pointer"
                            >
                                Sign in
                            </span>
                        </div>
                        <div className="flex gap-1 items-center">
                            <p>Buying for work?</p>
                            <span className=" text-blue-700 text-xs cursor-pointer hover:text-yellow-600 hover:underline">
                                Shop on Amazon Business
                            </span>
                        </div>
                    </div>
                </form>
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
