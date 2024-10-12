import Image from "next/image";
import supAb from "../../../../../public/assets/sup_ab.png";
import subWake from "../../../../../public/assets/sup_wake.webp";
import ScrollingAnimation from "@/frontend/components/ui/Animations/ScrollAnimation";
import { useTranslations } from "next-intl";
import { BITCOINONG_URL, WAKEUP_URL } from "@/constants";

const SUPPORTERS = [
  { src: supAb, alt: "Supporter Bitcoin Argentina" },
  { src: subWake, alt: "Supporter WakeUp Labs" },
];
export default function HomeSupporters() {
  const t = useTranslations("Home.Supporters");

  return (
    <ScrollingAnimation
      className="xl:h-screen mt-[180px] xl:mt-0 flex flex-col justify-center"
      el="section"
    >
      {/* <h2 className="mb-9">Supporters</h2> */}
      <div className="w-full flex flex-col lg:flex-row gap-10">
        <div className="w-full flex flex-col lg:flex-row items-center gap-2">
          <h3 className="text-lg text-orange_primary">{t("idea")}</h3>
          <a href={BITCOINONG_URL}
            target="_blank"
            className="w-full xl:w-[263px] h-[67px] relative"
            key={SUPPORTERS[0].alt}
          >
            <Image
              placeholder="blur"
              src={SUPPORTERS[0].src}
              alt={SUPPORTERS[0].alt}
              fill
              style={{objectFit: "contain"}}
            />
          </a>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center gap-2">
          <h3 className="text-lg text-orange_primary">{t("powered")}</h3>
          <a href={WAKEUP_URL}
            target="_blank"
            className="w-full xl:w-[263px] h-[67px] relative"
            key={SUPPORTERS[1].alt}
          >
            <Image
              placeholder="blur"
              src={SUPPORTERS[1].src}
              alt={SUPPORTERS[1].alt}
              fill
              style={{objectFit: "contain"}}
            />
          </a>
        </div>
      </div>
    </ScrollingAnimation>
  );
}
