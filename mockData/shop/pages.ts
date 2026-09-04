const dataShopPages = () => {
  const product = {
    id: "ACDC1",
    img: "/img/product-1.jpg",
    name: "Smart Watch Series B",
    rate: {
      rate: 4.6,
      users: 80,
    },
    discount: 20,
    price: 49.99,
    realPrice: 69.99,
  };
  const dealsCategories = [
    {
      name: "All",
      category: "?",
    },
    {
      name: "Electronics",
      category: "Electronics",
    },
    {
      name: "Beauty & Personal Care",
      category: "Beauty_PersonalCare",
    },
    {
      name: "Fashion & Clothing",
      category: "Fashion_Clothing",
    },
    {
      name: "Tools & Hardware",
      category: "Tools_Hardware",
    },
  ];

  return { product,dealsCategories };
};

export default dataShopPages;
