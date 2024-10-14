import { User } from "@/backend/entities/users/domain/UserDomain";
import BigB from "@/frontend/components/business/bigB";
import SignButton from "@/frontend/components/business/signButton";
import DivAnimated from "@/frontend/components/ui/Animations/DivAnimated";
import { ShareXButtonClient } from "@/frontend/components/ui/ShareOnXButton";
import { useTranslations } from "next-intl";
import HomeHero from "./hero";
import WorldLargestB from "./largestB";
import HomeHourManifest from "./ourManifest";
import HomeSupporters from "./supporters";

export default function HomePage({
  // urlToken,
  me,
  hasSigned,
}: {
  me: User | undefined | null;
  hasSigned: boolean;
}) {
  const tHeroSubtitle = useTranslations("Home.Hero.head");
  const tHero = useTranslations("Home.Hero");
  const tInvalidInvite = useTranslations("Home.InvalidInvite");

  const subtitles = [];
  for (let i = 0; i < 17; i++) {
    subtitles.push(tHeroSubtitle(`${i}.value`));
  }

  const wordage = {
    prehead: tHero("prehead"),
    head: subtitles,
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col-reverse lg:flex-row max-w-full">
        <div className="w-full flex-grow-0">
          <div className="xl:h-screen flex flex-col justify-center max-md:items-center">
            <HomeHero
              head={wordage.head}
              prehead={wordage.prehead}
              invalidInviteTitle={tInvalidInvite("title")}
              invalidInviteDescription={tInvalidInvite("description")}
            />
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <SignButton label={tHero("signButton")} />
              {hasSigned && (
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
