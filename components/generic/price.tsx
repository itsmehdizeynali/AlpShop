import Text from "./text";
import type { PricePropsType } from "./types";

export default function Price({ children,className,color="black", size = "base" }: PricePropsType) {
  return (
    <Text className={className} color={color} weight="black" size={size}>
      ${children}
    </Text>
  );
}
