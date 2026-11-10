import Text from "@/components/generic/text";
import Image from "next/image";

export default function OfflinePage() {
  return (
    <div
      className="flex items-center justify-center w-full h-screen"
    >
      <i className="icon-close-circle text-danger text-15xl mb-2"></i>
      <Text color="danger" size="lg">
        you are offline!
      </Text>
    </div>
  );
}
