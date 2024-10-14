import { getUserProfileData } from "@/backend/services/auth";
import HomePage from "@/frontend/sections/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bitcoin Manifest",
  description: "Sign the Bitcoin Manifest with your 𝕏 account",
};

export default async function Home({ params }: { params: {locale: string, slug: string[] } }) {
  const user = await getUserProfileData();
  const dbUser: any = user?.dbUser;
  const hasSigned = !!dbUser;
  return <HomePage me={dbUser} hasSigned={hasSigned} />;
}
