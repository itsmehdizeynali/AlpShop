"use client";

const dataLayoutHeader = () => {
  const links = [
      { title: "Home", href: "/" },
      { title: "Shop", href: "/shop" },
      { title: "Deals", href: "/deals" },
      { title: "About", href: "/about" },
      { title: "Contact Us", href: "/contact-us" },
      { title: "FAQ", href: "/faq" },
      { title: "Blog", href: "blog" },
    ];

  return { links };
};

export default dataLayoutHeader;
