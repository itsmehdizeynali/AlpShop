"use client";

import clsx from "clsx";
import Btn from "./btn";
import { useEffect, useState } from "react";
import { PaginationPropsType } from "./types";

export default function Pagination({
  total = 1,
  current = 1,
  reFetch,
  className,
}: PaginationPropsType) {
  // const [totalPages, setTotalPages] = useState<number[]>([1]);
  // useEffect(() => {
  //   if (total >= 5) {
  //     if (current >= 3) {
  //       setTotalPages([1, current - 1, current, current + 1, total]);
  //     } else {
  //       setTotalPages([1, 2, 3, total - 1, total]);
  //     }
  //   }
  //   const totalArray:number[] = [1];
  //   Array.from({ length: total }, (_, i) => i + 1).map((num) =>
  //     totalArray.push(num)
  //   );
  //   if(totalArray.length){
  //     setTotalPages(totalArray);
  //   }
  // }, []);
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
      reFetch(current - 1);
    }
  };
  const handleNext = () => {
    if (current !== total) {
      reFetch(current + 1);
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
          onClick={() => reFetch(item)}
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
