"use client"

import Text from "@/components/generic/text";
import clsx from "clsx";
import { useState } from "react";
import type { RatingPropsType } from "./types";

export default function ShopRating({productRate=0,users=0,className="",disabled=false}:RatingPropsType) {
  const [rate, setRate] = useState(productRate);
  const [activeStar, setActiveStar] = useState(productRate);
  return (
    <div className={clsx(className,"flex items-center",{"pointer-events-none":disabled})}>
      <div
        className="flex items-center"
        onMouseLeave={() => setActiveStar(rate)}
      >
        {[1, 2, 3, 4, 5].map((item, index) => (
          <i
            key={index}
            className={clsx(
              { "text-secondary": item <= activeStar },
              item <= rate ? "icon-star-1" : "icon-star",
              "text-sm me-1 last:me-0 cursor-pointer hover:text-secondary transition-all",
            )}
            onMouseEnter={() => setActiveStar(item)}
            onClick={() => setRate(item)}
          ></i>
        ))}
      </div>
      <Text size="xs" className="ms-1">
        ({productRate})
      </Text>
      <Text size="xs" className="ms-1">
        ({users})
      </Text>
    </div>
  );
}
