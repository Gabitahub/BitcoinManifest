import { ArrowLeft } from "lucide-react";
import LangSelect from "../LangSelect";
import Link from "next/link";
import BackButton from "./BackButton";
const Navbar = () => {
  return (
    <div className="flex justify-center ">
      <div className="max-w-[1920px] w-full px-5 xl:px-[80px] 2xl:px-[122px] fixed z-[1000]">
        <nav className="mt-[53px] flex items-center justify-between overflow-hidden w-full right-0">
          <BackButton />
          <div className="flex-1 z-50"></div>
          <LangSelect />
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
