import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthConfig } from "next-auth";
import { db } from "~/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { SiweMessage } from "siwe";
import type { AdapterUser } from "next-auth";
import { UserType, FocusArea } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      walletId: string;
      emailVerified?: Date | null;
    };
  }

  interface User {
    walletId?: string; // Add walletId to the User interface
    userType?: UserType;
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
      async authorize(credentials) {
        try {
          // Safely cast credentials to the Credentials interface
          const creds = credentials as Partial<Credentials>;

          if (!creds.message || !creds.signature) {
            throw new Error("Missing credentials");
          }

          const message = creds.message;
          const signature = creds.signature;

          // Verify SIWE message
          const siwe = new SiweMessage(JSON.parse(message));
          const result = await siwe.verify({ signature });

          if (!result.success) return null;

          let user = await db.user.findUnique({
            where: { walletId: siwe.address },
          });

          if (!user) {
            if (creds.userType === "DONOR") {
              user = await db.user.create({
                data: {
                  userType: UserType.DONOR,
                  walletId: siwe.address,
                  name: creds.name || "",
                  phoneNo: creds.phoneNo || "",
                  aadhar: creds.aadhar || "",
                  did: `did:ethr:${siwe.address}`,
                },
              });
            } else if (creds.userType === "NGO") {
              user = await db.user.create({
                data: {
                  userType: UserType.NGO,
                  walletId: siwe.address,
                  name: creds.name || "",
                  phoneNo: creds.phoneNo || "",
                  did: `did:ethr:${siwe.address}`,
                },
              });

              const ngo = await db.nGO.create({
                data: {
                  name: creds.name || "",
                  mission: creds.mission || "",
                  vision: creds.vision || "",
                  locationLat: creds.lat ? parseFloat(creds.lat) : 0,
                  locationLong: creds.lon ? parseFloat(creds.lon) : 0,
                  website: creds.website || "",
                  description: creds.desc || "",
                  userId: user.id,
                },
              });

              const focusArea = creds.focusArea
                ? JSON.parse(creds.focusArea)
                : [];
              const validAreas = Object.values(FocusArea);

              await Promise.all(
                focusArea
                  .filter((v: string) => validAreas.includes(v as FocusArea))
                  .map(async (v: string) => {
                    await db.nGOFocusArea.create({
                      data: {
                        ngoId: ngo.id,
                        focusArea: v as FocusArea,
                      },
                    });
                  }),
              );
            }
          }

          // Return the user object with walletId
          return {
            id: user?.id,
            name: user?.name ?? null,
            walletId: user?.walletId ?? "",
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
          walletId: (token.walletId as string) ?? "",
          name: session.user?.name ?? null,
          email: session.user?.email ?? null,
          emailVerified: session.user?.emailVerified ?? null,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.walletId = user.walletId ?? ""; // Now walletId is recognized on the User type
      }
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
};
