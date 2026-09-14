import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Text from "@/components/generic/text";
import ShopRating from "../generic/rating";
import Input from "@/components/generic/input";
import Textarea from "@/components/generic/textarea";
import type { CommentBoxPropsType } from "./types";

export default function ShopSectionsCommentBox({ id }: CommentBoxPropsType) {
  return (
    <Card color="transparent" hasBorder className="w-full">
      <HeaderSection shape size="h4" className="mb-sm-section">
        {id ? "Reply" : "Add Comment"}
      </HeaderSection>
      <Text as="label" size="sm" color="black" className="block mb-2">
        Rate
      </Text>
      {!id && <ShopRating size="lg" className="mb-3" />}
      <Input label="Name" wrapClasses="mb-3" />
      <Textarea label="Comment" wrapClasses="mb-4" />
      <Btn className="max-sm:w-full">{id?"Send":"Add"}</Btn>
    </Card>
  );
}
