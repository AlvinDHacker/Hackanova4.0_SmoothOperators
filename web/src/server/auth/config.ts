import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import { db } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import type { AdapterUser } from "next-auth";
import { UserType } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      walletId: string;
    };
  }

  interface AdapterUser {
    walletId?: string;
  }

  interface JWT {
    sub?: string;
    walletId?: string;
  }
}

export const authConfig: NextAuthConfig = {
  session: {
    strategy: "jwt", // Force using JWT session storage
  },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.message || !credentials?.signature) {
            throw new Error("Missing credentials");
          }

          const message = credentials.message as string;
          const signature = credentials.signature as string;

          // Verify SIWE message
          const siwe = new SiweMessage(JSON.parse(message));
          const result = await siwe.verify({ signature });

          if (!result.success) return null;

          // Check if user exists in the database by walletId
          let user = await db.user.findUnique({
            where: { walletId: siwe.address },
          });

          console.log(user);
          // If user doesn't exist, create a new one
          if (!user) {
            if (credentials.userType == "DONOR") {
              user = await db.user.create({
                data: {
                  userType: UserType.DONOR,
                  walletId: siwe.address,
                  name: credentials.name,
                  phoneNo: credentials.phoneNo,
                  aadhar: credentials.aadhar,
                  did: `did:ethr:${siwe.address}`,
                },
              });
            }

            if (credentials.userType == "NGO") {
              user = await db.user.create({
                data: {
                  userType: UserType.NGO,
                  walletId: siwe.address,
                  name: credentials.name,
                  phoneNo: credentials.phoneNo,
                  did: `did:ethr:${siwe.address}`,
                },
              });

              let ngo = await db.nGO.create({
                data: {
                  name: credentials.name,
                  mission: credentials.mission as string,
                  vision: credentials.vision as string,
                  locationLat: parseFloat(credentials.lat),
                  locationLong: parseFloat(credentials.lon),
                  website: credentials.website as string,
                  description: credentials.desc as string,
                  userId: user.id,
                },
              });

              const focusArea = JSON.parse(credentials.focusArea || "[]");

              let fa = ["FOOD", "MEDICAL", "TRAVEL", "INFRASTRUCTURE", "OTHER"];

              await Promise.all(
                focusArea.map(async (v) => {
                  await db.nGOFocusArea.create({
                    data: {
                      ngoId: ngo.id,
                      focusArea: fa[v as number],
                    },
                  });
                }),
              );
            }
          }

          return {
            id: user.id,
            name: user.name,
            walletId: user.walletId,
          };
        } catch (error) {
          console.error("SIWE Verification Failed:", error);
          return null;
        }
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ session, token }) {
      if (token.sub) {
        session.user = {
          id: token.sub,
          walletId: token.walletId,
          name: session.user?.name ?? null, // Preserve existing name if present
          email: session.user?.email ?? null, // Preserve existing email if present
          emailVerified: new Date(),
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.walletId = user.walletId || "";
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
};
