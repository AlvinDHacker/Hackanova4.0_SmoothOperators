import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import { db } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import type { AdapterUser } from "next-auth";
import { UserType } from "@prisma/client";
import { FocusArea } from "@prisma/client";

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
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials: Record<string, unknown>) {
        try {
          const message = credentials?.message as string | undefined;
          const signature = credentials?.signature as string | undefined;
          const userType = credentials?.userType as string | undefined;

          if (!message || !signature) {
            throw new Error("Missing credentials");
          }

          // Verify SIWE message
          const siwe = new SiweMessage(JSON.parse(message));
          const result = await siwe.verify({ signature });

          if (!result.success) return null;

          // Check if user exists in the database by walletId
          let user = await db.user.findUnique({
            where: { walletId: siwe.address },
          });

          if (!user) {
            if (userType === "DONOR") {
              user = await db.user.create({
                data: {
                  userType: UserType.DONOR,
                  walletId: siwe.address,
                  name: credentials.name as string,
                  phoneNo: credentials.phoneNo as string,
                  aadhar: credentials.aadhar as string,
                  did: `did:ethr:${siwe.address}`,
                },
              });
            }

            if (userType === "NGO") {
              user = await db.user.create({
                data: {
                  userType: UserType.NGO,
                  walletId: siwe.address,
                  name: credentials.name as string,
                  phoneNo: credentials.phoneNo as string,
                  did: `did:ethr:${siwe.address}`,
                },
              });

              const ngo = await db.nGO.create({
                data: {
                  name: credentials.name as string,
                  mission: credentials.mission as string,
                  vision: credentials.vision as string,
                  locationLat: parseFloat(credentials.lat as string),
                  locationLong: parseFloat(credentials.lon as string),
                  website: credentials.website as string,
                  description: credentials.desc as string,
                  userId: user.id,
                },
              });

              const focusArea = JSON.parse(
                (credentials.focusArea as string) || "[]",
              );
              const fa = [
                FocusArea.FOOD,
                FocusArea.MEDICAL,
                FocusArea.TRAVEL,
                FocusArea.INFRASTRUCTURE,
                FocusArea.OTHER,
              ];

              await Promise.all(
                focusArea.map(async (v: number) => {
                  await db.nGOFocusArea.create({
                    data: {
                      ngoId: ngo.id,
                      focusArea: fa[v] as FocusArea,
                    },
                  });
                }),
              );
            }
          }

          return {
            id: user?.id,
            name: user?.name,
            walletId: user?.walletId,
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
          walletId: token.walletId as string,
          name: session.user?.name ?? null,
          email: session.user?.email ?? null,
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
