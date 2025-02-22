"use client";
import React, { useEffect, useState, useContext, createContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser } from "~/app/api/manageUser";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: session, status } = useSession();
  const currPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    const findUser = async () => {
      const u = await getUser(session?.user.id as string);
      setUser(u);
    };

    if (
      status === "unauthenticated" &&
      currPath !== "/login" &&
      currPath !== "/home" &&
      currPath !== "/signup" &&
      currPath != "/"
    ) {
      router.push("/");
    } else if (status === "authenticated") {
      findUser();
    }
  }, [status, session, router]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
