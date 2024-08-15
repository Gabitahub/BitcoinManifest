"use client";
import { redirect, usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { LANGS } from "@/constants";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";

const LangSelect = () => {
    const pathname = usePathname();
    const currentLang = LANGS.find((l) =>
        pathname.toLowerCase().includes(l.toLowerCase())
    );

    const handleClick = (lang: string) => {
        if (currentLang) {
            const newPath = pathname.replace(
                currentLang.toLowerCase(),
                lang.toLowerCase()
            );
            console.log("currentLang", currentLang, lang, newPath);
            redirect(newPath);
        }
    };
    return (
        <Select onValueChange={handleClick}>
            <SelectTrigger className="w-fit z-[5000] flex gap-5">
                <Globe />
                <SelectValue placeholder={currentLang?.toUpperCase()} />
            </SelectTrigger>
            <SelectContent className="bg-black_secondary">
                {LANGS.map((lang) => {
                    return (
                        <SelectItem key={`langSelect_${lang}`} value={lang}>
                            {lang}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default LangSelect;
