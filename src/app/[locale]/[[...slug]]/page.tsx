import { checkInvite } from "@/backend/entities/users/application/check-invite/checkInvite";
import { apiUserRepository } from "@/backend/entities/users/infra/ApiUserRepository";
import { getUserProfileData } from "@/backend/services/auth";
import HomePage from "@/frontend/sections/home";
import { Metadata } from "next";

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
  description: "Sign the Bitcoin Manifest with your 𝕏 account",
};

export default async function Home({ params }: { params: {locale: string, slug: string[] } }) {
  const token = params.slug && params.slug[0];
  const urlToken: any = await getInvite(token);
  const user = await getUserProfileData();
  const dbUser: any = user?.dbUser;
  const hasSigned = !!dbUser;
  return <HomePage urlToken={urlToken} me={dbUser} hasSigned={hasSigned} />;
}
