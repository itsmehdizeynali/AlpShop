const dataShopIndex = () => {
  const hero = [
    {
      img: "/img/hero-1.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/category",
    },
    {
      img: "/img/hero-2.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/category",
    },
    {
      img: "/img/hero-3.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/category",
    },
    {
      img: "/img/hero-4.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/category",
    },
    {
      img: "/img/hero-5.jpg",
      alt: "Upgrade Your Digital Lifestyle",
      href: "/category",
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
  const product={
    id:"ACDC1",
    img:"/img/product-1.png",
    name:"Smart Watch Series B",
    rate:{
      rate:4.6,
      users:80,
    },
    discount:20,
    price:49.99,
    realPrice:69.99
  }

  return { hero,categories,services,product };
};

export default dataShopIndex;
