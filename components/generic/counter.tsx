"use client";

import clsx from "clsx";
import { useState } from "react";
import Btn from "./btn";
import type { CounterPropsType } from "./types";

export default function Counter({
  min = 1,
  max,
  num,
  className,
  loading = false,
}: CounterPropsType) {
  const [number, setNumber] = useState(num);
  return (
    <div
      className={clsx(
        className,
        "flex items-center bg-neutral-light rounded-full overflow-hidden",
      )}
    >
      {number === min && (
        <Btn
          icon="icon-trash"
          square
          size="xs"
          color="danger"
          variant="lightness"
        />
      )}
      {number > min && (
        <Btn
          icon="icon-minus"
          square
          size="xs"
          color="black"
          variant="lightness"
          onClick={() => setNumber(number - 1)}
        />
      )}
      <div className="w-9 flex items-center justify-center">
        {loading ? (
          <span className="w-5 h-5 border-[3px] border-solid border-r-primary border-b-primary border-primary/10 rounded-full block animate-spin m-auto"></span>
        ) : (
          number
        )}
      </div>
      <Btn
        icon="icon-plus"
        square
        size="xs"
        color="black"
        variant="lightness"
        disabled={number === max}
        onClick={() => setNumber(number + 1)}
      />
    </div>
  );
}
