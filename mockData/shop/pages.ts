const dataShopPages = () => {
  const product = {
    id: "ACDC1",
    img: "/img/product-1.png",
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

  const accordionItem = {
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit",
    paragraph:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, reprehenderit, porro eum non illo nisi blanditiis impedit rerum assumenda repellendus magni aliquid voluptates ad. Culpa magnam necessitatibus dicta velit similique.",
  };
  const faq = [
    {
      title: "Lorem ipsum dolor sit",
      accordionItems: [
        accordionItem,
        accordionItem,
        accordionItem,
        accordionItem,
        accordionItem,
      ],
    },
    {
      title: "Lorem ipsum dolor sit",
      accordionItems: [
        accordionItem,
        accordionItem,
        accordionItem,
        accordionItem,
        accordionItem,
      ],
    },
    {
      title: "Lorem ipsum dolor sit",
      accordionItems: [
        accordionItem,
        accordionItem,
        accordionItem,
        accordionItem,
        accordionItem,
      ],
    },
  ];
  const faqTabs = [
    {
      name: "Lorem ipsum dolor sit",
      id: 1,
    },
    {
      name: "Lorem ipsum dolor sit",
      id: 2,
    },
    {
      name: "Lorem ipsum dolor sit",
      id: 3,
    },
    {
      name: "Lorem ipsum dolor sit",
      id: 4,
    },
    {
      name: "Lorem ipsum dolor sit",
      id: 5,
    },
  ];

  const article = {
    id: "1",
    img: "/img/shopping.jfif",
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    author: "mehdi zeynali",
    paragraph:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt provident praesentium enim similique possimus corrupti",
    category: {
      name: "electrical",
      textColor: "#fff",
      backgroundColor: "#000",
    },
    date: "2026/05/27",
    time: 5,
  };
  const articleCategory = {
    category: "electrical",
    name: "electrical",
    icon: "icon-qr-code",
    count: 10,
  };

  const accountStats = [
    {
      linkText: "View All Orders",
      link: "/account/orders",
      value: 3,
      title: "Total Orders",
      icon: "icon-copy1",
    },
    {
      linkText: "View Wishlist",
      link: "/wishlist",
      value: 4,
      title: "Wishlist Items",
      icon: "icon-heart",
    },
    {
      linkText: "View Details",
      link: "/orders",
      value: "$865.97",
      title: "Total Spent",
      icon: "icon-star",
    },
    {
      linkText: "View Requests",
      link: "/account/returnRequests",
      value: 0,
      title: "Return Requests",
      icon: "icon-exchange",
    },
  ];
  const comment = {
    id: "1",
    img: "/img/product-1.png",
    user: {
      id: "258586",
      name: "mehdi zeynali",
    },
    date: "2026/05/27",
    paragraph:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero architecto non recusandae eos porro ipsa numquam fugit nobis delectus beatae. Itaque quo officia reprehenderit ducimus provident, ea nobis dolorem id.",
    replies: [
      {
        id: "2",
        img: "/img/product-1.png",
        user: {
          id: "258586",
          name: "mehdi zeynali",
        },
        date: "2026/05/27",
        paragraph:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero architecto non recusandae eos porro ipsa numquam fugit nobis delectus beatae. Itaque quo officia reprehenderit ducimus provident, ea nobis dolorem id.",
      },
      {
        id: "3",
        img: "/img/product-1.png",
        user: {
          id: "258586",
          name: "mehdi zeynali",
        },
        date: "2026/05/27",
        paragraph:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero architecto non recusandae eos porro ipsa numquam fugit nobis delectus beatae. Itaque quo officia reprehenderit ducimus provident, ea nobis dolorem id.",
      },
    ],
  };
  const shippingAndDelivery = {
    img: "/img/shopping.jfif",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, non. Animi recusandae, quas fuga reprehenderit deserunt perspiciatis neque nesciunt odit magni aliquid quae earum, porro dolorum hic. Ratione, fuga assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, non. Animi recusandae, quas fuga reprehenderit deserunt perspiciatis neque nesciunt odit magni aliquid quae earum, porro dolorum hic. Ratione, fuga assumenda.",
  };

  return {
    product,
    dealsCategories,
    accordionItem,
    faqTabs,
    shippingAndDelivery,
    faq,
    article,
    articleCategory,
    accountStats,
    comment,
  };
};

export default dataShopPages;
