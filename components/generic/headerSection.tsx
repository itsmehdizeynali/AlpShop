import Heading from "@/components/generic/heading";
import clsx from "clsx";
import { HeaderSectionPropsType } from "./types";
import Btn from "./btn";
import Link from "next/link";

export default function HeaderSection({
  children,
  className = "",
  mainSide,
  border = false,
  shape = false,
  size = "h2",
  link,
  icon,
  ...props
}: HeaderSectionPropsType) {
  return (
    <div
      className={clsx(
        "flex sm:items-center items-start",
        { "pb-2 border-b border-b-neutral-light": border },
        className,
      )}
      {...props}
    >
      <div
        className={clsx("me-2 flex max-sm:flex-wrap max-sm:gap-2", {
          "border-s-4 border-primary lg:ps-3.5 ps-2 grow": shape,
        })}
      >
        <Heading variant={size} className="me-4 capitalize flex items-center">
          {icon && (
            <i className={clsx(icon, "me-3 text-secondary text-xl")}></i>
          )}
          {children}
        </Heading>
        {mainSide}
      </div>
      {link && (
        <Btn
          size="sm"
          icon="icon-right-arrow"
          iconPlace="end"
          className="max-lg:text-xxs max-lg:border-none max-lg:px-0 shrink-0 max-lg:hover:bg-transparent"
          variant="outline-lightness"
          as={Link}
          href={link}
        >
          View All
        </Btn>
      )}
    </div>
  );
}
