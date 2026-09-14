import Image from "next/image";
import Link from "next/link";
import Heading from "../generic/heading";
import Text from "../generic/text";
import type { ArticleCardPropsType } from "./types";

export default function WidgetArticleRowCard({
  article,
}: ArticleCardPropsType) {
  return (
    <Link
      href={`/blog/${article.id}`}
      className="flex items-center group lg:py-2 py-1 px-4 hover:bg-neutral-lighter transition-all"
    >
      <Image
        alt="article"
        className="lg:w-14 w-12 lg:h-14 h-12 rounded-lg me-3 shrink-0 object-cover object-center"
        width={40}
        height={40}
        src={article.img}
      />
      <div className="grow">
        <Heading
          variant="h6"
          className="mb-2 !line-clamp-2 group-hover:text-secondary"
        >
          {article.title}
        </Heading>
        <Text size="xs" className="flex items-center">
          <i className="icon-calendar me-2"></i>
          {article.date}
        </Text>
      </div>
    </Link>
  );
}
