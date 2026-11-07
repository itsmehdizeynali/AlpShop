"use client";

import Link from "next/link";
import Text from "../generic/text";
import type { CategoryModalListItemPropsType } from "./types";
import { useState } from "react";
import clsx from "clsx";

export default function LayoutCategoryModalListItem({
  item,
  className,
  closeModal,
}: CategoryModalListItemPropsType) {
  const [showChildrens, setShowChildrens] = useState(false);

  return (
    <li
      className={clsx(
        "bg-neutral-lighter group rounded-lg hover:bg-primary-light transition-all overflow-hidden",
        { "bg-primary-light": showChildrens },
        className,
      )}
    >
      <Text
        color="black"
        href={
          !!item?.children?.length
            ? undefined
            : `/products?category=${item?.slug}`
        }
        as={!!item?.children?.length ? "div" : Link}
        className="flex cursor-pointer"
      >
        <Text
          onClick={() => {
            closeModal();
          }}
          color="black"
          href={
            !!item?.children?.length
              ? `/products?category=${item?.slug}`
              : undefined
          }
          as={!item?.children?.length ? "div" : Link}
          className="flex items-center p-3 grow"
        >
          <i className="icon-tag me-2"></i>
          {item?.name}
        </Text>
        <div
          onClick={() => {
            setShowChildrens(!showChildrens);
            if (!item?.children?.length) {
              closeModal();
            }
          }}
          className={clsx(
            "w-11 flex items-center justify-center shrink-0 transition-all",
            {
              "hover:bg-primary/10 group-hover:bg-primary/5":
                !!item?.children?.length,
            },
            {
              "bg-primary/5": showChildrens,
            },
          )}
        >
          <i
            className={clsx(
              !!item?.children?.length ? "icon-down" : "icon-right-arrow",
              { "rotate-180": showChildrens },
              "icon-down text-xxs transition-all",
            )}
          ></i>
        </div>
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
