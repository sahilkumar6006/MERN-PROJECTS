import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Keypair } from "@solana/web3.js";
import prisma from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;

        if (!email) {
          console.error("Sign-in rejected: Missing email.");
          return false;
        }

        try {
          // Check if the user already exists
          let userDb = await prisma.user.findUnique({
            where: { email },
          });

          if (!userDb) {
            // If user doesn't exist, create a new record
            const keypair = Keypair.generate();
            const publicKey = keypair.publicKey.toBase58();

            userDb = await prisma.user.create({
              data: {
                email,
                publicKey,
              },
            });
          }

          // Allow sign-in if user exists or was successfully created
          return true;
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false; // Reject sign-in on error
        }
      }

      // Default to rejecting sign-in for other providers
      return false;
    },
  },
});

export { handler as GET, handler as POST };
