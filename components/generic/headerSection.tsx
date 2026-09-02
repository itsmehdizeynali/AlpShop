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
        "flex sm:items-center items-start justify-between",
        { "pb-2 border-b border-b-neutral-light": border },
        className,
      )}
      {...props}
    >
      <div className="me-2 flex max-sm:flex-col">
        {shape && <div className="w-0.5 h-9 bg-primary me-3.5"></div>}
        <Heading variant={size} className="me-4 capitalize flex items-center">
          {icon && (
            <i className={clsx(icon, "me-3 text-secondary text-xl")}></i>
          )}
          {children}
        </Heading>
        {mainSide && <div className="max-sm:mt-2">{mainSide}</div>}
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
