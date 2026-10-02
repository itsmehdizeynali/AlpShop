"use client";

import Link from "next/link";
import Text from "../generic/text";
import type { CategoryModalListItemPropsType } from "./types";
import { useState } from "react";
import clsx from "clsx";

export default function LayoutCategoryModalListItem({
  item,
  className,
  closeModal
}: CategoryModalListItemPropsType) {
  const [showChildrens, setShowChildrens] = useState(false);

  return (
    <li
      className={clsx(
        "bg-neutral-lighter rounded-lg hover:bg-primary-light transition-all overflow-hidden",
        { "bg-primary-light": showChildrens },
        className,
      )}
    >
      <Text
        onClick={() => {
          setShowChildrens(!showChildrens)
          if(!item?.children?.length){
            closeModal()
          }
        }}
        color="black"
        href={!!item?.children?.length ? undefined : `/products?category=${item?.slug}`}
        as={!!item?.children?.length ? "div" : Link}
        className="flex items-center p-3 cursor-pointer"
      >
        <i className="icon-tag me-2"></i>
        {item?.name}
        <i
          className={clsx(
            !!item?.children?.length ? "icon-down" : "icon-right-arrow",
            { "rotate-180": showChildrens },
            "icon-down text-xxs ms-auto transition-all",
          )}
        ></i>
      </Text>
      {!!item?.children?.length && showChildrens && (
        <ul>
          {item?.children.map((children, index) => (
            <LayoutCategoryModalListItem
              closeModal={closeModal}
              className="ps-2 rounded-none"
              item={children}
              key={index}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
