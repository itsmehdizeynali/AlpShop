import { useEffect } from "react";
import type { BackdropPropsType } from "./types";

export default function Backdrop({ isShow, ...props }: BackdropPropsType) {
  console.log(isShow);

  useEffect(() => {
    console.log(isShow);
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isShow]);
  return isShow && <div className="backdrop" {...props}></div>;
}
