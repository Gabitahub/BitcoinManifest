"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BackButton = () => {
  const pathname = usePathname();
  const showButton = pathname?.includes("/congrats");
  return showButton ? (
    <Link href={"/"}>
      <ArrowLeft />
    </Link>
  ) : null;
};

export default BackButton;
