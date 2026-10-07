import Btn from "@/components/generic/btn";
import Heading from "@/components/generic/heading";
import Text from "@/components/generic/text";
import clsx from "clsx";
import Image from "next/image";
import type { CommentPropsType } from "./types";
import useFormatDate from "@/utils/format-date";
import ShopRating from "./rating";

export default function ShopComment({
  comment,
  className = "",
  handelReply,
  isReply = false,
}: CommentPropsType) {

  const replyBtnClick=()=>{
    handelReply(comment.id)
    const element = document.getElementById("sendCommentBox");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const { getFormatDateToDay } = useFormatDate();
  
  return (
    <div className={clsx("lg:mb-6 mb-6 last:mb-0", className)}>
      <div className={clsx({"lg:mb-6 mb-6 last:mb-0":isReply})}>
        <div className="flex flex-wrap items-center mb-2 lg:gap-3 gap-2">
          <div className="rounded-full overflow-hidden flex items-center justify-center w-12 h-12 bg-primary-light">
            {comment?.user.avatar ? (
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
          <Heading
            variant="h5"
            className={clsx(
              "!capitalize",
              !comment?.rating ? "me-auto" : "me-2",
            )}
          >
            {comment?.user.name}
          </Heading>
          {(!!comment?.rating || comment?.rating === 0) &&(
            <ShopRating
              className="me-auto"
              showDetails={false}
              productRate={comment?.rating}
              disabled
            />
          )}
          <div className="flex items-center">
            <Text className="me-4" color="dim" size="xs">
              {getFormatDateToDay(comment?.createdAt)}
            </Text>
            <Btn
              variant="text"
              iconPlace="end"
              size="xs"
              icon="icon-down-arrow"
              onClick={replyBtnClick}
            >
              reply
            </Btn>
          </div>
        </div>
        <Text>{comment?.content}</Text>
      </div>
      {!!comment?.replies.length && (
        <div className={clsx({"sm:ms-12 mt-4 border-s-2 border-neutral-light":!isReply})}>
          {comment.replies.map((item, index) => (
            <ShopComment
              isReply
              handelReply={handelReply}
              className={clsx({"sm:ps-4 ps-3 py-2":!isReply})}
              key={index}
              comment={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
