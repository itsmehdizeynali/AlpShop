import { useEffect } from "react";
import type { BackdropPropsType } from "./types";

export default function Backdrop({ isShow, ...props }: BackdropPropsType) {
  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isShow]);
  return isShow && <div className="backdrop" {...props}></div>;
}
