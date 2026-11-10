import type { statsDataType } from "@/components/genericTypes";

const dataShopPages = ({stats}:{stats?:statsDataType}) => {

  const dealsCategories = [
    {
      name: "Electronics",
      slug: "electronics",
      icon: "icon-cosmetics",
    },
    {
      name: "Beauty & Personal Care",
      slug: "BeautyAndPersonalCare",
      icon: "icon-gadgets",
    },
    {
      name: "Fashion & Clothing",
      slug: "FashionAndClothing",
      icon: "icon-costume",
    },
    {
      name: "Tools & Hardware",
      slug: "ToolsAndHardware",
      icon: "icon-drill",
    },
  ];
  const accountStats = [
    {
      linkText: "View Details",
      value: stats&&stats?.totalSpent||0,
      title: "Total Spent",
      icon: "icon-star-1",
    },
    {
      linkText: "View All Orders",
      link: "/account/orders",
      value: stats&&stats?.totalOrders||0,
      title: "Total Orders",
      icon: "icon-copy1",
    },
    {
      linkText: "View Wishlist",
      link: "/wishlist",
      value: stats&&stats?.wishlistItems||0,
      title: "Wishlist Items",
      icon: "icon-heart",
    },
    {
      linkText: "View Requests",
      link: "/account/returnRequests",
      value: stats&&stats?.returnRequests||0,
      title: "Return Requests",
      icon: "icon-exchange",
    },
  ];
  const shippingAndDelivery = {
    img: "/img/shopping.jfif",
    title: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    paragraph:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, non. Animi recusandae, quas fuga reprehenderit deserunt perspiciatis neque nesciunt odit magni aliquid quae earum, porro dolorum hic. Ratione, fuga assumenda. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, non. Animi recusandae, quas fuga reprehenderit deserunt perspiciatis neque nesciunt odit magni aliquid quae earum, porro dolorum hic. Ratione, fuga assumenda.",
  };

  return {
    dealsCategories,
    shippingAndDelivery,
    accountStats,
  };
};

export default dataShopPages;
