"use client";

import type { CategoryItemType } from "../genericTypes";
import ShopModal from "../shop/generic/modal";
import LayoutCategoryModalListItem from "./categoryModalListItem";
import type { CategoryModalPropsType } from "./types";
import { getCategoriesService } from "@/services/generic";
import { useQuery } from "@tanstack/react-query";

export default function LayoutHeaderCategoryModal({
  closeModal,
  isOpenModal,
}: CategoryModalPropsType) {
  const { data } = useQuery({
    queryKey:["categories"],
    queryFn:()=>getCategoriesService({pageSize:4})
  })
  console.log(data);
  
  return (
    <ShopModal isOpenModal={isOpenModal} closeModal={closeModal}>
      <ul>
        {!!data&& data.map((item:CategoryItemType, index:number) => (
          <LayoutCategoryModalListItem
            closeModal={closeModal}
            className="mb-2 last:mb-0"
            item={item}
            key={index}
          />
        ))}
      </ul>
    </ShopModal>
  );
}
