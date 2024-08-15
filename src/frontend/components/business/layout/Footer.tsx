import { WAKEUP_URL } from "@/constants";

const Footer = () => {
    return (
        <footer className="pt-[214px] pb-[85px] flex flex-col gap-5">
            <div className="w-full lg:flex justify-between items-center">
                <h3 className="font-syncopate text-3xl lg:text-[50px] xl:text-[70px] 2xl:text-[92px] text-white_secondary">
                    BITCOIN MANIFEST
                </h3>
                <a
                    href={WAKEUP_URL}
                    target="_blank"
                    className="text-base xl:text-lg 2xl:text-xl font-poppins"
                >
                    Developed by WakeUp Labs
                </a>
            </div>
            <div className="flex gap-5">
                <a
                    href={`mailto:bitcoinmanifest@bitcoinargentina.org`}
                    target="_blank"
                    className="text-base xl:text-lg 2xl:text-xl font-poppins underline underline-offset-2"
                >
                    Contact us
                </a>
                <a
                    href={`https://drive.google.com/file/d/1hoZOlh8OAfPCNTeIIprozlQII14E53sT/view`}
                    target="_blank"
                    className="text-base xl:text-lg 2xl:text-xl font-poppins underline underline-offset-2"
                >
                    FAQ
                </a>
            </div>
        </footer>
    );
};

export default Footer;
