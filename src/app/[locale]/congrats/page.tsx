// import { checkInvite } from "@/backend/entities/users/application/check-invite/checkInvite";
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
}: {
  params: { locale: string; slug: string[] };
}) {
  const user = await getUserProfileData();
  const dbUser: any = user?.dbUser;
  const hasSigned = !!dbUser;
  if(!hasSigned) redirect('/')
  return <CongratsPage me={dbUser} hasSigned={hasSigned} />;
}
