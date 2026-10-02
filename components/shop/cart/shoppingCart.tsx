import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import WidgetProductRowCard from "@/components/widget/productRowCard";
import type { shoppingCartPropsType } from "./type";

export default function ShopCartShoppingCart({items}:shoppingCartPropsType) {
  return (
    <div className="p-2 grow">
      <Card color="transparent" hasBorder>
        <HeaderSection size="h4" className="mb-sm-section" shape>
          Shopping Cart
        </HeaderSection>
        <div>
          {!!items&& items.map((item, index) => (
            <WidgetProductRowCard
              className="mb-3 last:mb-0"
              item={item}
              key={index}
              queryKeys={["cart","layout_data"]}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
