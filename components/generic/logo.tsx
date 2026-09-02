import Image from "next/image";
import logo from "@/public/img/logo.png";
import logoWhite from "@/public/img/logo-white.png";
import clsx from "clsx";
import Link from "next/link";
import { LogoPropsType } from "./types";

export default function Logo({
  className = "",
  size = "base",
  whiteLogo=false,
}: LogoPropsType) {
  const setSize = {
    sm: {
      width: 200,
      height: 30,
      textSize: "text-sm",
    },
    base: {
      width: 236,
      height: 35,
      textSize: "text-base",
    },
    lg: {
      width: 270,
      height: 40,
      textSize: "text-2xl",
    },
  };
  return (
    <Link href="/" className={clsx("w-fit flex items-center", className)}>
      <Image
        src={whiteLogo?logoWhite:logo}
        alt="logo"
        width={setSize[size]["width"]}
        height={setSize[size]["height"]}
        className="max-lg:h-[22px] max-lg:w-fit"
      />
    </Link>
  );
}
