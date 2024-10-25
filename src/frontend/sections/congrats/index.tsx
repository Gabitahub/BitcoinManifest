import { User } from "@/backend/entities/users/domain/UserDomain";
import BigB from "@/frontend/components/business/bigB";
import SignButtons from "@/frontend/components/business/signButtons";
import DivAnimated from "@/frontend/components/ui/Animations/DivAnimated";
import { ShareXButtonClient } from "@/frontend/components/ui/ShareOnXButton";
import { useTranslations } from "next-intl";
import HomeHero from "../home/hero";
import WorldLargestB from "../home/largestB";
import HomeHourManifest from "../home/ourManifest";
import HomeSupporters from "../home/supporters";

export default function CongratsPage({
  me,
  hasSigned,
}: {
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
              prehead={tHero("preheadSigned")}
              head={tHero("headSigned")}
              invalidInviteTitle={tInvalidInvite("title")}
              invalidInviteDescription={tInvalidInvite("description")}
            />
            <div className="flex flex-col lg:flex-row gap-5 items-center">
              {!hasSigned ? (
                <SignButtons />
              ) : (
                <ShareXButtonClient
                  label={tHero("shareButtonLabel")}
                  linkText={tHero("shareButtonLinkText")}
                />
              )}
            </div>
          </div>
          <DivAnimated>
            <HomeHourManifest />
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
      <WorldLargestB />
    </div>
  );
}
