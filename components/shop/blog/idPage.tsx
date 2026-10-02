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
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getArticleService } from "@/services/blog";
import useFormatDate from "@/utils/format-date";

export default function ShopBlogIdPage() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading } = useQuery({
    queryKey: ["product_details"],
    queryFn: () => getArticleService(id),
  });

  const {getFormatDateToDay}=useFormatDate()
  return (
    <div className="container my-section">
      <div className="flex max-lg:flex-wrap lg:items-start -m-2">
        <BlogSidebar />
        <div className="grow p-1 flex flex-wrap max-lg:order-first">
          {!!article && (
            <>
              <Card
                hasBorder
                color="transparent"
                className="w-full mb-sm-section"
              >
                <Heading className="mb-4">{article?.title}</Heading>
                <ul className="mb-4 lg:gap-3 gap-2 flex flex-wrap">
                  <Chip
                    as="li"
                    icon="icon-user1"
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
                    {getFormatDateToDay(article?.createdAt)}
                  </Chip>
                  <Chip
                    as="li"
                    icon="icon-wall-clock"
                    variant="lightness"
                    size="base"
                  >
                    {article?.readTime} min
                  </Chip>
                </ul>
                <Image
                  src={article?.image}
                  className="w-full object-center object-cover rounded-lg mb-4"
                  width={300}
                  height={180}
                  alt="article"
                />
                <div
                  className="content-editor"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
              </Card>
              <Card
                hasBorder
                color="transparent"
                className="w-full mb-sm-section"
              >
                <HeaderSection className="mb-sm-section" shape>
                  Tags
                </HeaderSection>
                <ul className=" flex flex-wrap gap-2">
                  {!!article.tags &&
                    article.tags.map((item, index) => (
                      <li key={index}>
                        <Btn
                          size="sm"
                          color="black"
                          variant="lightness"
                          href={`/blog?tags=${item.slug}`}
                          as={Link}
                        >
                          {item.name}
                        </Btn>
                      </li>
                    ))}
                </ul>
              </Card>
              <Card
                color="transparent"
                hasBorder
                className="w-full mb-sm-section"
              >
                <HeaderSection shape size="h4" className="mb-sm-section">
                  Comments
                </HeaderSection>
                {!!article.comments &&
                  article.comments.map((item, index) => (
                    <ShopComment comment={item} key={index} />
                  ))}
              </Card>
              <ShopSectionsCommentBox />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
