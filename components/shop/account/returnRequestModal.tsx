"use client";

import Textarea from "@/components/generic/textarea";
import ShopModal from "../generic/modal";
import Btn from "@/components/generic/btn";
import { useMutation } from "@tanstack/react-query";
import { requestReturnService } from "@/services/account";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReturnRequestModalPropsType } from "./types";

export default function ShopAccountReturnRequestModal({
  id,
  showModal,
  setShowModal,
}: ReturnRequestModalPropsType) {
  const router = useRouter();

  const returnRequestMutation = useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason: string }) =>
      requestReturnService({ orderId, reason }),
    onSuccess: (data) => {
      console.log(data);
      router.push("/account");
    },
  });

  const [reason, setReason] = useState<string>("");
  const returnFormSubmitFn = () => {
    returnRequestMutation.mutate({ orderId: id as string, reason });
  };
  return (
    <ShopModal
      header="Return Request"
      isOpenModal={showModal}
      closeModal={() => setShowModal(false)}
      central
    >
      <Textarea
        onChange={(e) => setReason(e.target.value)}
        label="Reason for return"
        wrapClasses="mb-3"
      />
      <Btn
        color="danger"
        onClick={returnFormSubmitFn}
        disabled={!reason.length}
        loading={returnRequestMutation.isPending}
      >
        Return Request
      </Btn>
    </ShopModal>
  );
}
