import Btn from "@/components/generic/btn";
import Card from "@/components/generic/card";
import Heading from "@/components/generic/heading";
import type { ModalPropsType } from "./types";
import Backdrop from "@/components/generic/backdrop";

export default function ShopModal({
  closeModal,
  isOpenModal,
  children,
}: ModalPropsType) {
  return (
    <>
      <Backdrop isShow={isOpenModal} onClick={closeModal} />
      {isOpenModal && (
        <Card className="fixed top-0 start-0 w-[320px] h-screen overflow-y-auto custom-scroll z-40 bg-white !rounded-none">
          <div className="flex items-center mb-4">
            <Heading>categories</Heading>
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
          {children}
        </Card>
      )}
    </>
  );
}
