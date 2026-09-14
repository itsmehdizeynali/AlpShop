import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import Image from "next/image";
import Link from "next/link";
import type { ArticleRowCardPropsType } from "./types";

export default function WidgetArticleCard({
  article,
}: ArticleRowCardPropsType) {
  return (
    <Card
      as={Link}
      href={`/blog/${article.id}`}
      hasBorder
      color="transparent"
      className="!p-0 overflow-hidden hover:bg-neutral-lighter transition-all group"
    >
      <Image
        src={article?.img}
        className="w-full lg:h-[180px] h-[150px] object-center object-cover rounded-lg rounded-bl-none"
        width={300}
        height={180}
        alt="article"
      />
      <div className="bg-white group-hover:bg-neutral-lighter transition-all w-fit rounded-xl z-10 relative py-1.5 px-3 -mt-3">
        <div
          style={{
            backgroundColor: article?.category.backgroundColor,
            color: article?.category.textColor,
          }}
          className="px-2.5 py-1.5 bg-primary-light rounded-lg text-primary text-xs"
        >
          {article?.category.name}
        </div>
      </div>
      <div className="p-3 pt-1">
        <Heading
          variant="h5"
          className="mb-2 line-clamp-2 group-hover:text-secondary lg:h-12 h-10"
        >
          {article?.title}
        </Heading>
        <Text className="line-clamp-2 mb-3 lg:h-10 h-8">
          {article?.paragraph}
        </Text>
        <div className="flex items-center">
          <Text size="xs" className="flex items-center me-4">
            <i className="icon-calendar text-base me-2"></i>
            {article?.date}
          </Text>
          <Text size="xs" className="flex items-center">
            <i className="icon-dollar-circle text-base me-2"></i>
            {article?.time} min read
          </Text>
        </div>
      </div>
    </Card>
  );
}
