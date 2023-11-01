import { UserValidateWithMail } from "@/lib/validate";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createNewUser } from "../../../../firebase/actions";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "password", type: "password" },
            },
            authorize: async (credentials, req) => {
                if (!credentials) return;
                const result = await UserValidateWithMail(credentials.email);

                if (result) {
                    if (result.provider === "google") {
                        throw new Error(
                            "Please log in using your Google account to access your account."
                        );
                    } else {
                        // compare()
                        const checkPassword = await compare(
                            credentials.password,
                            result.password
                        );

                        // incorrect password
                        if (!checkPassword) {
                            throw new Error("Email or Password is wrong !");
                        }
                        return result;
                    }
                } else {
                    throw new Error(
                        "No account is associated with this email !"
                    );
                }
            },
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                if (user?.email) {
                    const isUser = await UserValidateWithMail(user.email);
                    if (isUser) {
                        return Promise.resolve(true);
                    } else {
                        const userData = {
                            id: user.id,
                            name: user.name || "",
                            email: user.email || "",
                            password: null,
                            image:
                                user.image ||
                                "https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg",
                            provider: "google",
                        };
                        await createNewUser(userData);
                        return Promise.resolve(true);
                    }
                } else {
                    return Promise.reject();
                }
            } else {
                return Promise.resolve(true);
            }
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token, user }) {
            if (token.accessToken) {
                session.accessToken = token.accessToken;
                session.user.id = token.sub;
            } else {
                session.accessToken = token.sub;
                session.user.id = token.sub;
            }
            return session;
        },
    },
});
