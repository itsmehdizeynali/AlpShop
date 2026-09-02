import Image from "next/image";

export default function OfflinePage() {
  return (
    <div
      className="flex items-center justify-center w-full h-screen"
    >
      <Image alt="offline" width={600} height={336} className="w-full h-screen" src={"/img/offline.jfif"} />
    </div>
  );
}
