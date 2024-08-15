import { checkInvite } from "@/backend/entities/users/application/check-invite/checkInvite";
import { apiUserRepository } from "@/backend/entities/users/infra/ApiUserRepository";
import { getUserProfileData } from "@/backend/services/auth";
import CongratsPage from "@/frontend/sections/congrats";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const getInvite = async (token: string) => {
  if (!token) return null;
  const urlToken = await checkInvite(apiUserRepository())(token);
  return {
    ...urlToken,
    valid: !!urlToken,
  };
};

export const metadata: Metadata = {
  title: "Bitcoin Manifest",
};

export default async function Congrats({
  params,
}: {
  params: { locale: string; slug: string[] };
}) {
  const token = params.slug && params.slug[0];
  const urlToken: any = await getInvite(token);
  const user = await getUserProfileData();
  const dbUser: any = user?.dbUser;
  const hasSigned = !!dbUser;
  if(!hasSigned) redirect('/')
  return <CongratsPage urlToken={urlToken} me={dbUser} hasSigned={hasSigned} />;
}
