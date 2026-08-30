import Heading from "@/components/generic/heading";
import clsx from "clsx";
import { HeaderSectionPropsType } from "./types";

export default function HeaderSection({
  children,
  className = "",
  endSide,
  border = false,
  shape = false,
  size = "h2",
  icon,
  ...props
}: HeaderSectionPropsType) {
  return (
    <div
      className={clsx(
        "flex items-center ",
        { "pb-2 border-b border-b-neutral-light": border },
        className,
      )}
      {...props}
    >
      {shape && <div className="w-0.5 h-9 bg-primary me-3.5"></div>}
      {
        icon&&
        <i className={clsx(icon,"me-3 text-secondary text-xl")}></i>
      }
      <Heading variant={size} className="me-4">
        {children}
      </Heading>
      {endSide}
    </div>
  );
}
