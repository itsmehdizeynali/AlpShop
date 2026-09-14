"use client";

const dataLayoutHeader = () => {
  const links = [
      { title: "Home", href: "/" },
      { title: "Shop", href: "/products" },
      { title: "Deals", href: "/deals" },
      { title: "About", href: "/about" },
      { title: "Contact Us", href: "/contactUs" },
      { title: "FAQ", href: "/faq" },
      { title: "Blog", href: "/blog" },
    ];

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

  return { links,categories };
};

export default dataLayoutHeader;
