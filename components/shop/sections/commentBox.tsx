import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import Text from "@/components/generic/text";
import ShopRating from "../generic/rating";
import Input from "@/components/generic/input";
import Textarea from "@/components/generic/textarea";
import type { CommentBoxPropsType } from "./types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addAommentBoxSchema,
  type AddAommentBoxForms,
} from "@/validations/shop/commentBox";
import { addProductCommentService } from "@/services/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddArticleCommentService } from "@/services/blog";

export default function ShopSectionsCommentBox({
  slug,
  parentId,
  setParentId,
  queryKeys,
  type = "product",
}: CommentBoxPropsType) {
  const { register, handleSubmit, formState, reset } =
    useForm<AddAommentBoxForms>({ resolver: zodResolver(addAommentBoxSchema) });

  const [rate, setRate] = useState<undefined | number>(undefined);

  const QueryClient = useQueryClient();
  const handelQueryKeys = () => {
    queryKeys?.map((item) =>
      QueryClient.invalidateQueries({ queryKey: [item] }),
    );
  };

  const addProductCommentMutation = useMutation({
    mutationFn: addProductCommentService,
    onSuccess: () => {
      handelQueryKeys();
      reset();
      setParentId(undefined);
    },
  });
  const addArticleCommentMutation = useMutation({
    mutationFn: AddArticleCommentService,
    onSuccess: () => {
      handelQueryKeys();
      reset();
      setParentId(undefined);
    },
  });

  const handelSend = (data: AddAommentBoxForms) => {
    if (type === "product") {
      addProductCommentMutation.mutate({
        slug,
        data: { ...data, parentId, rating: !parentId?rate:undefined },
      });
      return;
    }
    addArticleCommentMutation.mutate({
      slug,
      data: { ...data, parentId },
    });
  };

  return (
    <Card
      onSubmit={handleSubmit(handelSend)}
      as="form"
      color="transparent"
      hasBorder
      className="w-full scroll-mt-2"
      id="sendCommentBox"
    >
      <HeaderSection shape size="h4" className="mb-sm-section">
        {parentId ? "Reply" : "Add Comment"}
      </HeaderSection>
      {type !== "article" && !parentId && (
        <>
          <Text as="label" size="sm" color="black" className="block mb-2">
            Rate
          </Text>
          <ShopRating
            handelSetRate={(item) => setRate(item)}
            size="lg"
            className="mb-3"
          />
        </>
      )}
      <Textarea
        showMsg={!!formState.errors.content?.message}
        msg={formState.errors.content?.message}
        {...register("content")}
        label="Content"
        wrapClasses="mb-4"
      />
      <Btn
        loading={addProductCommentMutation.isPending}
        className="max-sm:w-full"
        type="submit"
        disabled={!formState.isValid}
      >
        {parentId ? "Send" : "Add"}
      </Btn>
    </Card>
  );
}
