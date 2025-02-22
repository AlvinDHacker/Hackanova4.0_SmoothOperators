"use server";

import { db } from "~/server/db";

export async function getNGOInfo(userId: string) {
  const ngo = await db.nGO.findUnique({
    where: { userId },
    select: {
      name: true,
      mission: true,
      website: true,
      locationLat: true,
      locationLong: true,
    },
  });

  return ngo;
}
