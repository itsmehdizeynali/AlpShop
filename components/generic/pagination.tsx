"use client";

import clsx from "clsx";
import Btn from "./btn";
import { PaginationPropsType } from "./types";
import {useSetParams} from "@/utils/setParams";

export default function Pagination({
  total = 1,
  current = 1,
  className,
}: PaginationPropsType) {
  const {setParam}=useSetParams();

  const totalPages = (() => {
    if (total < 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current >= 3 && current <= total - 2) {
      return [1, current - 1, current, current + 1, total];
    }

    if (current < 3) {
      return [1, 2, 3, total - 1, total];
    }

    return [1, total - 2, total - 1, total];
  })();

  const handlePrev = () => {
    if (current !== 1) {
      setParam("page", String(current - 1));
    }
  };
  const handleNext = () => {
    if (current !== total) {
      setParam("page", String(current + 1));
    }
  };
  const handleClick = (num:number) => {
    if (current !== num) {
      setParam("page", String(num));
    }
  };

  return (
    <ul className={clsx("flex items-center", className)}>
      <Btn
        as="li"
        className="sm:me-2 me-1.5 last:!me-0"
        square
        size="sm"
        color="black"
        variant="lightness"
        onClick={handlePrev}
        disabled={current === 1}
      >
        <i className="icon-left"></i>
      </Btn>

      {totalPages.map((item, index) => (
        <Btn
          as="li"
          className={clsx(
            { "pointer-events-none": item === current },
            "sm:me-2 me-1.5 last:!me-0",
          )}
          square
          key={index}
          color={item === current ? "primary" : "black"}
          variant={item === current ? "normal" : "lightness"}
          size="sm"
          onClick={() => handleClick(item)}
        >
          {item}
        </Btn>
      ))}
      <Btn
        as="li"
        className="sm:me-2 me-1.5 last:!me-0"
        square
        size="sm"
        color="black"
        variant="lightness"
        onClick={handleNext}
        disabled={current === total}
      >
        <i className="icon-right"></i>
      </Btn>
    </ul>
  );
}
