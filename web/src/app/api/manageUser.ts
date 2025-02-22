"use server";

import { db } from "~/server/db";

export async function checkUser(addr: string) {
  const count = await db.user.count({
    where: {
      walletId: addr,
    },
  });

  return count != 0;
}

export async function getUser(id: string) {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}
