import ScrollingAnimation from "@/frontend/components/ui/Animations/ScrollAnimation";
import { useTranslations } from "next-intl";
import SignButton from "@/frontend/components/business/signButton";

export default function HomeHourManifest(/* { urlToken }: any */) {
  const t = useTranslations("Home.Manifest");

  return (
    <ScrollingAnimation
      el="section"
      className="overflow-hidden mt-[180px] xl:mt-0 xl:h-screen flex flex-col justify-center"
    >
      <h2 className="mb-9">{t("title")}</h2>
      <p dangerouslySetInnerHTML={{__html: t.raw('body')}} className="text-[1.5rem]" />
      <div className="mt-10 xl:mt-[90px]">
        <SignButton label={t("button")} /* urlToken={urlToken} */ />
      </div>
    </ScrollingAnimation>
  );
}
