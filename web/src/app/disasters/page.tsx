import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import DisasterVerify from "~/components/DisasterVerify";
import DonorLogin from "~/components/Login/DonorLogin";
import NgoLogin from "~/components/Login/NgoLogin";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <div className="mx-3">
      <div className="mb-3 flex flex-row items-center justify-between gap-3">
        <h1 className="text-start text-xl font-bold sm:text-2xl">
          Emergencies
        </h1>
        {/* <CreateNoteButton /> */}
        <Button>Hi</Button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Disaster Name</CardTitle>
                <CardDescription>Disaster Name</CardDescription>
              </div>
              {/* {status == "" ? ( */}
              <Badge variant={"success"} className="my-auto">
                ACTIVE
              </Badge>
              {/* ) : ( */}
              <Badge variant={"destructive"} className="my-auto">
                RESOLVED
              </Badge>
              {/* )} */}
            </div>
          </CardHeader>
          <CardContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            repellat ut architecto cumque ea et doloremque iure accusantium.
            Esse nostrum ullam at ad veniam expedita nesciunt ea ipsa aut
            consectetur!
          </CardContent>
          <CardFooter className="border-t">
            <div className="flex justify-end">
              <Button>
                View <ExternalLink />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <DisasterVerify />
      <DonorLogin />
      <NgoLogin />
    </div>
  );
}
