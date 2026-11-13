const dataShopIndex = () => {
  const hero = [
    {
      img: "/img/hero-1.png",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products",
    },
    {
      img: "/img/hero-2.png",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=BeautyAndPersonalCare",
    },
    {
      img: "/img/hero-3.png",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=electronics",
    },
    {
      img: "/img/hero-4.png",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=FashionAndClothing",
    },
    {
      img: "/img/hero-5.png",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/products?category=ToolsAndHardware",
    },
  ];
  const categories = [
    {
      alt: "Electronics",
      href: "/products?category=Electronics",
      src: "/img/Electronics.png",
    },
    {
      alt: "Beauty & Personal Care",
      href: "/products?category=BeautyAndPersonalCare",
      src: "/img/BeautyAndCare.png",
    },
    {
      alt: "Fashion & Clothing",
      href: "/products?category=FashionAndClothing",
      src: "/img/FashionAndClothing.png",
    },
    {
      alt: "Tools & Hardware",
      href: "/products?category=ToolsAndHardware",
      src: "/img/ToolsAndHardware.png",
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
