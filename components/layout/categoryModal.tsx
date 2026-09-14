"use client";

import dataLayoutHeader from "@/mockData/layout/header";
import ShopModal from "../shop/generic/modal";
import LayoutCategoryModalListItem from "./categoryModalListItem";
import type { CategoryModalPropsType } from "./types";

export default function LayoutHeaderCategoryModal({
  closeModal,
  isOpenModal,
}: CategoryModalPropsType) {
  const { categories } = dataLayoutHeader();
  return (
    <ShopModal isOpenModal={isOpenModal} closeModal={closeModal}>
      <ul>
        {categories.map((item, index) => (
          <LayoutCategoryModalListItem
            className="mb-2 last:mb-0"
            item={item}
            key={index}
          />
        ))}
      </ul>
    </ShopModal>
  );
}
