"use server";

import { db } from "~/server/db";

export async function getDonorInfo(userId: string) {
  const donor = await db.user.findUnique({
    where: { id: userId },
  });

  return donor;
}
