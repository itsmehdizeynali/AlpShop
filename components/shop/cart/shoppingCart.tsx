import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import WidgetProductRowCard from "@/components/widget/productRowCard";
import dataShopIndex from "@/mockData/shop";

export default function ShopCartShoppingCart() {
    const { product } = dataShopIndex();
  return (
    <div className="p-2 grow">
      <Card color="transparent" hasBorder>
        <HeaderSection size="h4" className="mb-sm-section" shape>
          Shopping Cart
        </HeaderSection>
        <div>
          {[product, product, product, product].map((item, index) => (
            <WidgetProductRowCard
              className="mb-3 last:mb-0"
              product={item}
              key={index}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
