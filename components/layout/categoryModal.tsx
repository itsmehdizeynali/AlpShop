import ShopModal from "../shop/generic/modal";
import LayoutCategoryModalListItem from "./categoryModalListItem";
import type { CategoryModalPropsType } from "./types";

export default function LayoutHeaderCategoryModal({closeModal,isOpenModal
}:CategoryModalPropsType) {
  
  const categories = [
    {
      name: "Electronics",
      href: "/categories/Electronics",
      childrens: [
        {
          name: "All",
          href: "/categories/Electronics",
          childrens: [
            {
              name: "All",
              href: "/categories/Electronics",
            },
            {
              name: "Mobiles",
              href: "/categories/Electronics/Mobiles",
            },
            {
              name: "Laptops",
              href: "/categories/Electronics/Laptops",
            },
            {
              name: "Airpods",
              href: "/categories/Electronics/Airpods",
            },
            {
              name: "SmartWatches",
              href: "/categories/Electronics/SmartWatches",
            },
          ],
        },
        {
          name: "Mobiles",
          href: "/categories/Electronics/Mobiles",
        },
        {
          name: "Laptops",
          href: "/categories/Electronics/Laptops",
        },
        {
          name: "Airpods",
          href: "/categories/Electronics/Airpods",
        },
        {
          name: "SmartWatches",
          href: "/categories/Electronics/SmartWatches",
        },
      ],
    },
    {
      name: "Beauty & Personal Care",
      href: "/categories/Beauty&PersonalCare",
    },
    {
      name: "Fashion & Clothing",
      href: "/categories/Fashion&Clothing",
      childrens: [
        {
          name: "All",
          href: "/categories/Fashion&Clothing",
        },
        {
          name: "Shirts",
          href: "/categories/Fashion&Clothing/Shirts",
        },
        {
          name: "Trousers",
          href: "/categories/Fashion&Clothing/Trousers",
        },
        {
          name: "Shoes",
          href: "/categories/Fashion&Clothing/Shoes",
        },
        {
          name: "Hats",
          href: "/categories/Fashion&Clothing/Hats",
        },
        {
          name: "Hoodies",
          href: "/categories/Fashion&Clothing/Hoodies",
        },
        {
          name: "Glasses",
          href: "/categories/Fashion&Clothing/Glasses",
        },
        {
          name: "Backpacks",
          href: "/categories/Fashion&Clothing/Backpacks",
        },
        {
          name: "Bags",
          href: "/categories/Fashion&Clothing/Bags",
        },
      ],
    },
    {
      name: "Tools & Hardware",
      href: "/categories/Tools&Hardware",
    },
  ];
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
