import Btn from "@/components/generic/btn";
import Chip from "@/components/generic/chip";
import Heading from "@/components/generic/heading";
import Logo from "@/components/generic/logo";
import Text from "@/components/generic/text";
import Link from "next/link";

export default function ShopAboutIntro() {
  return (
    <div className="container flex items-center my-section">
      <div className="w-3/5 pe-4">
        <Chip size="base" variant="lightness" className="mb-3">
          Lorem ipsum dolor
        </Chip>
        <Heading variant="h2" className="mb-4">
          <span className="text-primary">ALP SHOP</span> dolor sit amet
          consectetur adipisicing elit
        </Heading>
        <Text className="mb-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          magnam officiis dolores. Assumenda amet dolore illum quibusdam dicta
          ipsum voluptatem. Numquam sunt fugit perferendis voluptatibus qui
          optio placeat. Qui, repudiandae.
        </Text>
        <div className="flex">
          <Btn
            icon="icon-telephone"
            as={Link}
            href="/contactUs"
            color="black"
            variant="outline"
            className="me-2"
          >
            Contact Us
          </Btn>
          <Btn icon="icon-article" as={Link} href="/products">
            View Shop
          </Btn>
        </div>
      </div>
      <div className="w-2/5 relative min-h-72 overflow-hidden rounded-lg bg-primary-light lg:p-8 p-5 flex items-center justify-center">
        <div className="absolute -top-16 -right-12 h-48 w-48 rounded-full bg-primary/10"></div>
        <div className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-primary/10"></div>
        <div className="relative z-10 text-center">
          <div className="mx-auto lg:mb-5 mb-4 flex lg:h-24 lg:w-24 h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <i
              className="icon icon-article lg:text-12xl text-8xl leading-none"
              aria-hidden="true"
            ></i>
          </div>
          <Logo className="pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
