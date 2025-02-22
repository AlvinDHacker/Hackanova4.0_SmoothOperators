"use server";

import { db } from "~/server/db";

export async function getDisasterInfo(id: string) {
  const ngo = await db.nGO.findUnique({
    where: { id },
    select: {
        
    name           :true,
    description    :true,
    // source         :true,
    // link           :true,
    locationLat    :true,
    locationLong   :true,
    // severity       :true,     
    // status         :true, 
     
    },
  });

  return ngo;
}
