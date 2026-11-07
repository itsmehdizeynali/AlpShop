"use client";

import clsx from "clsx";
import { useState } from "react";
import Btn from "./btn";
import type { CounterPropsType } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItemService, updateCartItemService } from "@/services/cart";

export default function Counter({
  min = 1,
  max,
  num,
  className,
  productId,
  queryKeys,
}: CounterPropsType) {
  const [number, setNumber] = useState(num);
  const count = num || number;

  const QueryClient = useQueryClient();

  const handelQueryKeys = () => {
    queryKeys?.map((item) =>
      QueryClient.invalidateQueries({ queryKey: [item] }),
    );
  };

  const setQuantityInCartMutation = useMutation({
    mutationFn: updateCartItemService,
    onSuccess: () => {
      handelQueryKeys();
    },
  });

  const removeItemFromCartMutation = useMutation({
    mutationFn: removeCartItemService,
    onSuccess: () => {
      handelQueryKeys();
    },
  });

  const changeCount = (type: "add" | "reduce" | "remove") => {
    if (type === "add" || type === "reduce") {
      const quantity = type === "add" ? num + 1 : num - 1;
      setQuantityInCartMutation.mutate({ itemId: productId, quantity });
      return;
    }
    removeItemFromCartMutation.mutate(productId);
  };

  const isLoading= setQuantityInCartMutation.isPending || removeItemFromCartMutation.isPending

  return (
    <div
      className={clsx(
        className,
        "flex items-center w-fit bg-white shadow-lighter-alpha p-1 rounded-full overflow-hidden",
      )}
    >
      {count === min && (
        <Btn
        rounded
          icon="icon-delete"
          square
          size="xs"
          color="danger"
          variant="lightness"
          disabled={isLoading}
          onClick={() => changeCount("remove")}
        />
      )}
      {count > min && (
        <Btn
        rounded
          icon="icon-minus"
          square
          size="xs"
          color="white"
          
          disabled={isLoading}
          onClick={() => {
            setNumber(count - 1);
            changeCount("reduce");
          }}
        />
      )}
      <div className="w-11 flex items-center justify-center">
        {isLoading ? (
          <span className="w-5 h-5 border-[3px] border-solid border-r-primary border-b-primary border-primary/10 rounded-full block animate-spin m-auto"></span>
        ) : (
          count
        )}
      </div>
      <Btn
      rounded
        icon="icon-plus"
        square
        size="xs"
        color="white"
        
        disabled={count === max || isLoading}
        onClick={() => {
          setNumber(count + 1);
          changeCount("add");
        }}
      />
    </div>
  );
}
