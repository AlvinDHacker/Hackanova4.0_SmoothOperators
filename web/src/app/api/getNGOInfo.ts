"use server";

import { db } from "~/server/db";

export async function getNGOInfo(userId: string) {
  const ngo = await db.nGO.findUnique({
    where: { userId },
  });

  return ngo;
}
