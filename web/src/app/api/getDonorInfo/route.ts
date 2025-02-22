"use server";

import { db } from "~/server/db";

export async function getDonorInfo(userId: string) {
  const donor = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNo: true,
      aadhar: true, // Assuming `aadhar` might be used as an address field
      accounts: {
        select: {
          id: true,
          provider: true,
        },
      },
    //   donations: {
    //     select: {
    //       id: true,
    //       amount: true,
    //       date: true,
    //       cause: true,
    //     },
    //   },
    },
  });

  return donor;
}
