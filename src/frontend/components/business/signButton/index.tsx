import { TInvite } from "@/backend/entities/users/domain/UserDomain";
import { InvitesDialog } from "@/frontend/components/business/hero/InvitesDialog";
import { Button } from "@/frontend/components/ui/button";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function SignButton({
  urlToken,
  label,
}: {
  urlToken: TInvite & { valid: boolean };

  label: string;
}) {
  const session = await getSession();
  const user = session?.user;
  const dbUser: any = user?.dbUser;
  const hasSigned = !!dbUser;

  return !hasSigned ? (
    <Button>
      <Link href={`/api/auth/login?invitation=${urlToken?.token}`}>
        {label}
      </Link>
    </Button>
  ) : (
    <InvitesDialog invites={dbUser?.UrlTokens} />
  );
}
