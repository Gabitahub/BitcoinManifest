import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/frontend/components/ui/dialog";
import { Button } from "../../ui/button";
import { TOKEN_STATUS, UrlToken } from "@prisma/client";
import InvitesList from "./InvitesList";
import { useTranslations } from "next-intl";

export function InvitesDialog({ invites }: { invites: UrlToken[] }) {
  const t = useTranslations("Home.InvitesDialog");

  const validInvites = invites.filter(
    (invite) => invite?.status === TOKEN_STATUS.VALID
  );
  const invalidInvites = invites?.length - validInvites.length;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t("title")}</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[800px]">
        <DialogHeader>
          <h3 className="text-black_secondary font-bold font-poppins text-lg">
            {t("subtitle")}
          </h3>
          <DialogDescription className="text-black_secondary font-poppins">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <InvitesList invites={invites} inputActionLabel={t('inputActionLabel')} />
        <DialogFooter>
          <span className="text-black_secondary text-sm mt-10">
            {t("footer", { invalidInvites: invalidInvites })}
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
