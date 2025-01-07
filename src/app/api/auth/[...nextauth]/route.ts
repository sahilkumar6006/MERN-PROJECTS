import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Keypair } from "@solana/web3.js";
import prisma from "@/lib/prisma"; 

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email;

        if (!email) {
          return false; // Reject sign-in if email is missing
        }

        // Check if the user already exists in the database
        const userDb = await prisma.user.findUnique({
          where: { email },
        });

        if (userDb) {
          return false; // Reject sign-in if user already exists
        }

       
        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();

        
        await prisma.user.create({
          data: {
            email,
            publicKey, 
          },
        });

        return true; 

      return false; 
    },
  },
});

export { handler as GET, handler as POST };
