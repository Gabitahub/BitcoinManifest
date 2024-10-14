import { Button } from "@/frontend/components/ui/button";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function SignButton({
  label,
}: {

  label: string;
}) {
  const session = await getSession();
  const user = session?.user;
  const dbUser: any = user?.dbUser;
  const hasSigned = !!dbUser;

  return !hasSigned ? (
    <Button>
      <Link href={`/api/auth/login`}>
        {label}
      </Link>
    </Button>
  ) : (
    <></>
  );
}
