"use client";
import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

interface UserContextType {
  user: SessUser | null;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface SessUser {
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  address?: string | undefined;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<SessUser | null>(null);
  const { data: session, status } = useSession();
  const currPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    console.log("first", session);
    if (
      status === "unauthenticated" &&
      currPath !== "/login" &&
      currPath !== "/home" &&
      currPath !== "/signup"
    ) {
      // router.push("/login");
    } else {
      if (status == "authenticated") {
        setUser(session.user);
      }
    }
  }, [status, session, router]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
