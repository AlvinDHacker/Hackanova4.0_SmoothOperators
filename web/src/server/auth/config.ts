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
    userType?: UserType;
  }

  interface JWT {
    sub?: string;
    walletId?: string;
  }
}

// Define credentials type explicitly
interface Credentials {
  message: string;
  signature: string;
  userType?: "DONOR" | "NGO";
  name?: string;
  phoneNo?: string;
  aadhar?: string;
  did?: string;
  mission?: string;
  vision?: string;
  lat?: string;
  lon?: string;
  website?: string;
  desc?: string;
  focusArea?: string;
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
      async authorize(credentials: Partial<Credentials>) {
        try {
          if (!credentials?.message || !credentials?.signature) {
            throw new Error("Missing credentials");
          }

          const message = credentials.message;
          const signature = credentials.signature;

          // Verify SIWE message
          const siwe = new SiweMessage(JSON.parse(message));
          const result = await siwe.verify({ signature });

          if (!result.success) return null;

          let user = await db.user.findUnique({
            where: { walletId: siwe.address },
          });

          if (!user) {
            if (credentials.userType === "DONOR") {
              user = await db.user.create({
                data: {
                  userType: UserType.DONOR,
                  walletId: siwe.address,
                  name: credentials.name || "",
                  phoneNo: credentials.phoneNo || "",
                  aadhar: credentials.aadhar || "",
                  did: `did:ethr:${siwe.address}`,
                },
              });
            } else if (credentials.userType === "NGO") {
              user = await db.user.create({
                data: {
                  userType: UserType.NGO,
                  walletId: siwe.address,
                  name: credentials.name || "",
                  phoneNo: credentials.phoneNo || "",
                  did: `did:ethr:${siwe.address}`,
                },
              });

              const ngo = await db.nGO.create({
                data: {
                  name: credentials.name || "",
                  mission: credentials.mission || "",
                  vision: credentials.vision || "",
                  locationLat: credentials.lat
                    ? parseFloat(credentials.lat)
                    : 0,
                  locationLong: credentials.lon
                    ? parseFloat(credentials.lon)
                    : 0,
                  website: credentials.website || "",
                  description: credentials.desc || "",
                  userId: user.id,
                },
              });

              const focusArea = JSON.parse(credentials.focusArea || "[]");
              const validAreas = [
                FocusArea.FOOD,
                FocusArea.MEDICAL,
                FocusArea.TRAVEL,
                FocusArea.INFRASTRUCTURE,
                FocusArea.OTHER,
              ];

              await Promise.all(
                focusArea.map(async (v: number) => {
                  if (validAreas[v]) {
                    await db.nGOFocusArea.create({
                      data: {
                        ngoId: ngo.id,
                        focusArea: validAreas[v] as FocusArea,
                      },
                    });
                  }
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
          walletId: (token.walletId as string) || "",
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
