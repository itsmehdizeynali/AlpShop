import clsx from "clsx";
import { FC } from "react";

// تایپ برای رنگ‌ها
type ColorKeys =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "dim";

type ColorsType = Record<ColorKeys, string[]>;

const colors: ColorsType = {
  primary: ["bg-primary-light", "bg-primary", "bg-primary-dark"],
  success: ["bg-success-light", "bg-success", "bg-success-dark"],
  warning: ["bg-warning-light", "bg-warning", "bg-warning-dark"],
  danger: ["bg-danger-light", "bg-danger", "bg-danger-dark"],
  info: ["bg-info-light", "bg-info", "bg-info-dark"],
  neutral: [
    "bg-neutral-light",
    "bg-neutral",
    "bg-neutral-dark",
    "bg-neutral-lighter",
  ],
  dim: [ "bg-dim-light", "bg-dim", "bg-dim-dark"],
};

const UiColors: FC = () => {
  return (
    <div>
      {Object.keys(colors).map((colorKey) => {
        // Type assertion که TS بفهمه colorKey یکی از ColorKeys هست
        const key = colorKey as ColorKeys;

        return (
          <div className="flex flex-wrap -m-2" key={key}>
            {colors[key].map((color, index) => (
              <div key={index} className="w-1/4 p-2 text-dim text-md">
                <div className={clsx("h-10 rounded-md", color)}></div>
                {color}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default UiColors;