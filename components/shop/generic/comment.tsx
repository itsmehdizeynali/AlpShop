import Btn from "@/components/generic/btn";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import clsx from "clsx";
import Image from "next/image";
import type { CommentPropsType } from "./types";

export default function ShopComment({
  comment,
  className = "",
}: CommentPropsType) {
  return (
    <div className={clsx("lg:mb-8 mb-6 last:mb-0",className)}>
      <div>
        <div className="flex flex-wrap items-center mb-2 lg:gap-3 gap-2">
          <div className="rounded-full overflow-hidden flex items-center justify-center w-12 h-12 bg-primary-light">
            {comment?.img ? (
              <Image
                src={"/img/product-1.png"}
                width={48}
                height={48}
                alt="profile"
                className="w-full h-full"
              />
            ) : (
              <i className="icon-avatar text-lg text-primary"></i>
            )}
          </div>
          <Heading variant="h5" className="!capitalize me-auto">
            {comment?.user.name}
          </Heading>
          <div className="flex items-center">
            <Text className="me-4" color="dim" size="xs">
              {comment?.date}
            </Text>
            <Btn
              variant="text"
              iconPlace="end"
              size="xs"
              icon="icon-down-arrow"
            >
              reply
            </Btn>
          </div>
        </div>
        <Text>{comment?.paragraph}</Text>
      </div>
      {!!comment.replies && (
        <div className="sm:ps-12 mt-4">
          {comment.replies.map((item, index) => (
            <ShopComment
              className="sm:ps-4 ps-3 border-s-2 py-2 border-neutral-light !mb-0"
              key={index}
              comment={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
