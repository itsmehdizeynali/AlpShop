import Card from "../generic/card";
import { CardColors } from "../generic/types";

export default function UiCards() {
  const colors:CardColors[] = [
    "primary",
    "success",
    "warning",
    "info",
    "danger",
    "neutral-dark",
    "gradient-primary",
    "neutral",
  ];
  return (
    <div>
      {colors.map((item, index) => (
        <div className="container pb-8 last:pb-0" key={index}>
          <Card color={item}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium perspiciatis vero, distinctio alias accusamus maxime
            nemo quasi ex libero? Magni nam quaerat amet. Ducimus nam fuga
            quaerat sunt eveniet?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium perspiciatis vero, distinctio alias accusamus maxime
            nemo quasi ex libero? Magni nam quaerat amet. Ducimus nam fuga
            quaerat sunt eveniet?
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil
            praesentium perspiciatis vero, distinctio alias accusamus maxime
            nemo quasi ex libero? Magni nam quaerat amet. Ducimus nam fuga
            quaerat sunt eveniet?
          </Card>
        </div>
      ))}
    </div>
  );
}
