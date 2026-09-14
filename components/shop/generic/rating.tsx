"use client";

import Text from "@/components/generic/text";
import clsx from "clsx";
import { useState } from "react";
import type { RatingPropsType } from "./types";

export default function ShopRating({
  productRate,
  users,
  className = "",
  disabled = false,
  size = "sm",
}: RatingPropsType) {
  const [rate, setRate] = useState(productRate||0);
  const [activeStar, setActiveStar] = useState(productRate||0);

  const sizes = {
    sm: {
      icon: "text-sm",
      text: "xs",
    },
    lg: {
      icon: "text-lg",
      text: "sm",
    },
  };
  return (
    <div
      className={clsx(className, "flex items-center", {
        "pointer-events-none": disabled,
      })}
    >
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
              sizes[size]["icon"],
              "me-1 last:me-0 cursor-pointer hover:text-secondary transition-all",
            )}
            onMouseEnter={() => setActiveStar(item)}
            onClick={() => setRate(item)}
          ></i>
        ))}
      </div>
      {productRate && (
        <Text
          size={sizes[size]["text"] as "xs" | "sm"}
          className={clsx("ms-1")}
        >
          ({productRate})
        </Text>
      )}
      {users && (
        <Text
          size={sizes[size]["text"] as "xs" | "sm"}
          className={clsx("ms-1")}
        >
          ({users})
        </Text>
      )}
    </div>
  );
}
