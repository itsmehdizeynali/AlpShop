"use client";

import Btn from "@/components/generic/btn";
import Text from "@/components/generic/text";
import type { CommentsWrapPropsType } from "./types";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import ShopSectionsCommentBox from "../sections/commentBox";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProductCommentsService } from "@/services/product";
import { useState } from "react";
import { getArticleCommentsService } from "@/services/blog";
import ShopComment from "./comment";

export default function ShopCommentsWrap({
  slug,
  type = "product",
}: CommentsWrapPropsType) {
  const [parentId, setParentId] = useState<undefined | string>(undefined);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", slug],
      queryFn:
        type === "product"
          ? ({ pageParam = 1 }: { pageParam: number }) =>
              getProductCommentsService(slug, { page: pageParam })
          : ({ pageParam = 1 }: { pageParam: number }) =>
              getArticleCommentsService(slug, { page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const { page, totalPages } = lastPage.pagination;
        return page < totalPages ? page + 1 : undefined;
      },
    });

    
    
    const comments = data?.pages.flatMap((page) => page.comments);
    console.log(data);
  return (
    <>
      {!!comments ? (
        <Card color="transparent" hasBorder className="mb-4 w-full">
          <HeaderSection shape size="h4" className="mb-sm-section">
            Comments
          </HeaderSection>
          {comments.map((item, index) => (
            <ShopComment handelReply={setParentId} comment={item} key={index} />
          ))}
          <Btn
            color="black"
            variant="lightness"
            className="mx-auto"
            disabled={!hasNextPage}
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
          >
            show more
          </Btn>
        </Card>
      ) : (
        <Text>dont have comment</Text>
      )}
      <ShopSectionsCommentBox
        parentId={parentId}
        queryKeys={type==="product"?["comments","product_details"]:["comments"]}
        slug={slug}
        type={type}
        setParentId={setParentId}
      />
    </>
  );
}
