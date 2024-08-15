import { TInvite, User } from "@/backend/entities/users/domain/UserDomain";
import BigB from "@/frontend/components/business/bigB";
import DivAnimated from "@/frontend/components/ui/Animations/DivAnimated";
import { useTranslations } from "next-intl";
import SignButton from "@/frontend/components/business/signButton";
import HomeHero from "../home/hero";
import HomeHourManifest from "../home/ourManifest";
import HomeSupporters from "../home/supporters";
import WorldLargestB from "../home/largestB";
import { ShareXButtonClient } from "@/frontend/components/ui/ShareOnXButton";

export default function CongratsPage({
  urlToken,
  me,
  hasSigned,
}: {
  urlToken: TInvite & { valid: boolean };
  me: User | null | undefined;
  hasSigned: boolean;
}) {
  const tHero = useTranslations("Home.Hero");
  const tInvalidInvite = useTranslations("Home.InvalidInvite");

  return (
    <div className="w-full">
      <div className="w-full flex flex-col-reverse lg:flex-row max-w-full">
        <div className="w-full flex-grow-0">
          <div className="xl:h-screen flex flex-col justify-center max-md:items-center">
            <HomeHero
              urlToken={urlToken}
              prehead={tHero("preheadSigned")}
              head={tHero("headSigned")}
              invalidInviteTitle={tInvalidInvite("title")}
              invalidInviteDescription={tInvalidInvite("description")}
            />
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <SignButton label={tHero("signButton")} urlToken={urlToken} />
              {hasSigned && <ShareXButtonClient label={tHero("shareButtonLabel")} linkText={tHero("shareButtonLinkText")} />}
            </div>
          </div>
          <DivAnimated>
            <HomeHourManifest urlToken={urlToken} />
          </DivAnimated>
          <DivAnimated>
            <HomeSupporters />
          </DivAnimated>
        </div>
        <div className="lg:relative flex-shrink-0">
          <div className="lg:sticky py-10 lg:pt-0 lg:pb-10 lg:top-10">
            <BigB />
          </div>
        </div>
      </div>
      <WorldLargestB urlToken={urlToken} />
    </div>
  );
}
