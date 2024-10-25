import { Button } from "@/frontend/components/ui/button";
import { getSession } from "@auth0/nextjs-auth0";
import { useTranslations } from "next-intl";
import Link from "next/link";
import NostrSignButton from "./nostrSignButton";

export default async function SignButtons() {
  const t = useTranslations("Home.Hero");
  return (<>
    <Button>
      <Link href={`/api/auth/login`}>{t("signWithXButton")}</Link>
    </Button>
    <NostrSignButton label={t("signWithNostr")} errorMsg={t("signWithNostrError")} />
  </>);
}
