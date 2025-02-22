"use server";

import { db } from "~/server/db";

export async function getNGOs() {
  const ngo = await db.nGO.findMany();

  return ngo;
}
