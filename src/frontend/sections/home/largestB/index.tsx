import { Card } from "@/frontend/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/frontend/components/ui/carousel";
import { useTranslations } from "next-intl";
import Image from "next/image";
import bitcoinB2 from "../../../../../public/assets/bitcoinB-2.jpg";
import bitcoinB3 from "../../../../../public/assets/bitcoinB-3.webp";
import bitcoinB5 from "../../../../../public/assets/bitcoinB-5.jpg";

const BIMAGES = [bitcoinB2, bitcoinB3, bitcoinB5];
export default function WorldLargestB() {
  const t = useTranslations("Home.LargestB");

  return (
    <section className="min-h-screen mt-[180px] flex flex-col justify-center">
      <Card>
        <div className="grid grid-cols-2 gap-5 lg:gap-10 2xl:gap-20">
          <div className="col-span-full xl:col-span-1 h-full flex items-center">
            <div>
              <p className="text-black_secondary text-base lg:text-lg">
                Buenos Aires, Argentina
              </p>
              <h2 className="my-5 lg:my-9">{t("title")}</h2>
              <p className="text-black_secondary">{t("body")}</p>
              <div className="mt-10 xl:mt-[90px]">
                <a className="text-black_secondary underline underline-offset-2" href={`https://drive.google.com/drive/folders/1ohIf5qb2-4FFk6nvX0qqApWWz6lTe0wK`} target="_blank">
                  {t("button")}
                </a>
              </div>
            </div>
          </div>
          <div className="col-span-full xl:col-span-1 ">
            <Carousel className="w-full cursor-grab">
              <CarouselContent>
                {BIMAGES.map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="w-full h-[400px] xl:h-[500px] relative">
                      <Image
                        placeholder="blur"
                        src={src}
                        alt="supporter 0x"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-[30px] xl:rounded-[50px] 2xl:rounded-[70px]"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </Card>
    </section>
  );
}
