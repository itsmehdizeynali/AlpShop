import clsx from "clsx";
import Text from "./text";
import Alert from "./alert";
import { TextareaPropsType } from "./types";

export default function Textarea({
  label,
  endSide,
  startSide,
  endSideLabel,
  wrapClasses,
  showMsg = false,
  msgType = "danger",
  msg = null,
  ...props
}: TextareaPropsType) {
  const generateBorderColor = {
    danger: "!border-danger",
    info: "!border-info",
    success: "!border-success",
    warning: "!border-warning",
    primary: "!border-primary",
  };
  return (
    <div className={wrapClasses}>
      <div className="w-full mb-1.5 flex items-center">
        <Text
          as="label"
          size="sm"
          htmlFor=""
          color="dim-light"
          className="block"
        >
          {label}
        </Text>
        {endSideLabel}
      </div>
      <div
        className={clsx(
          "w-full lg:h-32 h-24 border border-solid border-neutral-light rounded-md flex items-center focus-within:!border-primary/70",
          showMsg && generateBorderColor[msgType],
        )}
      >
        {startSide && (
          <div className="ps-3 text-sm text-dim-light">{startSide}</div>
        )}
        <textarea
          className="w-full h-full bg-transparent border-0 outline-none shadow-none p-3 text-primary placeholder:text-dim-light text-sm font-medium"
          {...props}
        />
        {endSide && (
          <div className="pe-3 text-sm text-dim-light">{endSide}</div>
        )}
      </div>
      {showMsg && (
        <Alert color={msgType} variant="text" className="mt-2">
          {msg}
        </Alert>
      )}
    </div>
  );
}
