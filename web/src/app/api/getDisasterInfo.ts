"use server";

import { db } from "~/server/db";

export async function getDisasterInfo(id: string) {
  const ngo = await db.disaster.findUnique({
    where: { id },
  });

  return ngo;
}
