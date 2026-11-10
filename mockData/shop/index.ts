const dataShopIndex = () => {
  const hero = [
    {
      img: "/img/hero-1.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products",
    },
    {
      img: "/img/hero-2.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=BeautyAndPersonalCare",
    },
    {
      img: "/img/hero-3.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=electronics",
    },
    {
      img: "/img/hero-4.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=FashionAndClothing",
    },
    {
      img: "/img/hero-5.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=ToolsAndHardware",
    },
  ];
  const categories = [
    {
      alt: "Electronics",
      href: "/products?category=Electronics",
      src: "/img/category-1.jpg",
    },
    {
      alt: "Beauty & Personal Care",
      href: "/products?category=BeautyAndPersonalCare",
      src: "/img/category-1.jpg",
    },
    {
      alt: "Fashion & Clothing",
      href: "/products?category=FashionAndClothing",
      src: "/img/category-1.jpg",
    },
    {
      alt: "Tools & Hardware",
      href: "/products?category=ToolsAndHardware",
      src: "/img/category-1.jpg",
    },
  ];
  const services = [
    {
      icon: "icon-basket",
      title: "Free Shipping",
      subTitle: "On Orders Over $50",
    },
    {
      icon: "icon-basket",
      title: "Free Shipping",
      subTitle: "On Orders Over $50",
    },
    {
      icon: "icon-basket",
      title: "Free Shipping",
      subTitle: "On Orders Over $50",
    },
    {
      icon: "icon-basket",
      title: "Free Shipping",
      subTitle: "On Orders Over $50",
    },
  ];

  return { hero, categories, services };
};

export default dataShopIndex;
