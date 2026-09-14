import Logo from "@/components/generic/logo";
import Image from "next/image";
import type { ReactNode } from "react";

export default function authLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-start">
      <div className="lg:w-1/2 w-full flex flex-col items-center min-h-screen justify-center max-lg:z-10 py-section px-3">
        <Logo className="mb-4" />
        {children}
      </div>
      <div className="lg:w-1/2 w-full bg-primary sticky top-0 h-screen max-lg:fixed max-lg:blur-md">
        <Image
          className="w-full h-full object-cover object-top-left"
          src="/img/auth.png"
          alt="intro"
          width={1536}
          height={1024}
        />
      </div>
    </div>
  );
}
