"use client";

import dataShopPages from "@/mockData/shop/pages";
import BlogSidebar from "./sidebar";
import Card from "@/components/generic/card";
import Image from "next/image";
import Heading from "@/components/generic/heading";
import Chip from "@/components/generic/chip";
import HeaderSection from "@/components/generic/headerSection";
import Link from "next/link";
import Btn from "@/components/generic/btn";
import ShopSectionsCommentBox from "../sections/commentBox";
import ShopComment from "../generic/comment";

export default function ShopBlogIdPage() {
  const { article ,comment} = dataShopPages();
  return (
    <div className="container my-section">
      <div className="flex max-lg:flex-wrap lg:items-start -m-2">
        <BlogSidebar />
        <div className="grow p-1 flex flex-wrap max-lg:order-first">
          <Card hasBorder color="transparent" className="w-full mb-sm-section">
            <Heading className="mb-4">{article?.title}</Heading>
            <ul className="mb-4 lg:gap-3 gap-2 flex flex-wrap">
              <Chip
                as="li"
                icon="icon-avatar"
                variant="lightness"
                size="base"
                className="capitalize"
              >
                {article?.author}
              </Chip>
              <Chip
                as="li"
                icon="icon-calendar"
                variant="lightness"
                size="base"
              >
                {article?.date}
              </Chip>
              <Chip
                as="li"
                icon="icon-dollar-circle"
                variant="lightness"
                size="base"
              >
                {article?.time} min
              </Chip>
            </ul>
            <Image
              src={article?.img}
              className="w-full object-center object-cover rounded-lg mb-4"
              width={300}
              height={180}
              alt="article"
            />
            <div className="content-editor">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa
                quasi vel voluptatibus modi, officiis a voluptate. At natus
                aspernatur iste non inventore? Rem similique sed deserunt
                debitis, ut amet harum?
              </p>

              <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
                sapiente blanditiis vitae maxime quis ea recusandae qui, aperiam
                totam aut minus, praesentium quia nobis sequi, beatae quae
                voluptatem facilis corporis.
              </p>
              <ul>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </li>
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                </li>
              </ul>

              <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
                quam eaque, cum non aut harum ea. Ab quisquam ea saepe
                perferendis, molestiae debitis ducimus. Consequatur facere
                delectus iure doloremque non?
              </p>

              <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h2>
              <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos incidunt repellat, repudiandae perferendis accusamus
                ipsum sapiente nam qui eaque quaerat. Officiis voluptatum alias
                laborum libero amet nulla, aperiam distinctio minus.
              </p>
              <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam
                totam nemo perspiciatis, aliquid facilis, repellat similique,
                vitae voluptate quo repudiandae quisquam accusamus autem
                consequatur? Quod iusto maxime officiis non fugiat.
              </p>

              <h2>Lorem ipsum dolor sit</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                accusantium exercitationem, officiis repudiandae debitis
                cupiditate commodi possimus modi atque natus in aut iusto autem
                quia consequatur obcaecati culpa voluptates corrupti.
              </p>
            </div>
          </Card>
          <Card hasBorder color="transparent" className="w-full mb-sm-section">
            <HeaderSection className="mb-sm-section" shape>
              Tags
            </HeaderSection>
            <ul className=" flex flex-wrap gap-2">
              <li>
                <Btn
                  size="sm"
                  color="black"
                  variant="lightness"
                  href="/blog"
                  as={Link}
                >
                  electrical
                </Btn>
              </li>
              <li>
                <Btn
                  size="sm"
                  color="black"
                  variant="lightness"
                  href="/blog"
                  as={Link}
                >
                  electrical
                </Btn>
              </li>
              <li>
                <Btn
                  size="sm"
                  color="black"
                  variant="lightness"
                  href="/blog"
                  as={Link}
                >
                  electrical
                </Btn>
              </li>
              <li>
                <Btn
                  size="sm"
                  color="black"
                  variant="lightness"
                  href="/blog"
                  as={Link}
                >
                  electrical
                </Btn>
              </li>
            </ul>
          </Card>
          <Card color="transparent" hasBorder className="w-full mb-sm-section">
            <HeaderSection shape size="h4" className="mb-sm-section">
              Comments
            </HeaderSection>
            {[comment, comment, comment, comment].map((item, index) => (
              <ShopComment comment={item} key={index} />
            ))}
          </Card>
          <ShopSectionsCommentBox />
        </div>
      </div>
    </div>
  );
}
