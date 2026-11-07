import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import type { ModalPropsType } from "./types";
import Backdrop from "@/components/generic/backdrop";
import clsx from "clsx";

export default function ShopModal({
  closeModal,
  isOpenModal,
  children,
  central,
  header,
}: ModalPropsType) {
  return (
    <>
      <Backdrop isShow={isOpenModal} onClick={closeModal} />
      {isOpenModal && (
        <Card
          className={clsx(
            central
              ? "w-full max-w-120 max-h-7/12 top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2"
              : "rounded-none! top-0 start-0 w-[320px] h-screen",
            "fixed overflow-y-auto custom-scroll z-40 bg-white",
          )}
        >
          {header && (
            <div className="flex items-center mb-4">
              <Heading>{header}</Heading>
              <Btn
                onClick={closeModal}
                className="ms-auto"
                square
                size="xs"
                color="black"
                variant="lightness"
                icon="icon-cross-out-mark"
              />
            </div>
          )}
          {children}
        </Card>
      )}
    </>
  );
}
