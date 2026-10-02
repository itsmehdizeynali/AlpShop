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
  const product = {
    id: "cmuis0q7p0026u4wokqis00p3",
    cartQuantity:0,
    name: "45-Piece Tool Set",
    slug: "45-piece-tool-set",
    description:
      "Complete home tool kit with wrenches, screwdrivers, and pliers.",
    price: 59.99,
    realPrice: 79.99,
    discount: 20,
    stock: 35,
    isActive: true,
    categoryId: "cmuif7scl0007u4z8jndyzf9x",
    brandId: "cmuifbzn8000bu4z8p20ilbd5",
    isFeatured: false,
    isWishlisted: false,
    isInCart: false,
    createdAt: "2026-09-26T19:22:14.581Z",
    updatedAt: "2026-09-26T19:22:14.581Z",
    images: [
      {
        id: "cmujs96on000xu4pk3a26a7h5",
        productId: "cmuis0q7p0026u4wokqis00p3",
        url: "https://dummyimage.com/600x400/0891b2/ffffff&text=45+piece+tool+set+Front",
        altText: "45 Piece Tool Set - Front",
        position: 0,
      },
      {
        id: "cmujs96on000yu4pk34eqrls7",
        productId: "cmuis0q7p0026u4wokqis00p3",
        url: "https://dummyimage.com/600x400/db2777/ffffff&text=45+piece+tool+set+Side",
        altText: "45 Piece Tool Set - Side",
        position: 1,
      },
      {
        id: "cmujs96on000zu4pkfj18kw3k",
        productId: "cmuis0q7p0026u4wokqis00p3",
        url: "https://dummyimage.com/600x400/2563eb/ffffff&text=45+piece+tool+set+Back",
        altText: "45 Piece Tool Set - Back",
        position: 2,
      },
    ],
    category: {
      id: "cmuif7scl0007u4z8jndyzf9x",
      name: "Tools & Hardware",
      slug: "ToolsAndHardware",
      image: null,
      parentId: null,
    },
    brand: {
      id: "cmuifbzn8000bu4z8p20ilbd5",
      name: "IronGrip",
      slug: "irongrip",
      logo: null,
    },
    rate: {
      rate: 0,
      users: 0,
    },
  }

  return { hero, categories, services, product };
};

export default dataShopIndex;
