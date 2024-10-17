// import { checkInvite } from "@/backend/entities/users/application/check-invite/checkInvite";
import { getUser } from "@/backend/entities/users/application/get/getUser";
import { apiUserRepository } from "@/backend/entities/users/infra/ApiUserRepository";
import { getUserProfileData } from "@/backend/services/auth";
import CongratsPage from "@/frontend/sections/congrats";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bitcoin Manifest",
};

export default async function Congrats({
  params,
  searchParams,
}: {
  params: { locale: string; slug: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const nostrParam = searchParams.nostr as string;

  let hasSigned = false;
  let dbUser = undefined; 

  if(nostrParam) {
    const repository = apiUserRepository();
    // FIXME: this should be extracted somewhere else
    dbUser = await getUser(repository)(`nostr:${nostrParam}`)
  } else {
    const user = await getUserProfileData();
    dbUser = user?.dbUser;
  }

  hasSigned = !!dbUser;
  if(!hasSigned) redirect('/')

  return <CongratsPage me={dbUser} hasSigned={hasSigned} />;
}
