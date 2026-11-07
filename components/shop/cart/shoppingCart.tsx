import Card from "@/components/generic/card";
import HeaderSection from "@/components/generic/headerSection";
import WidgetProductRowCard from "@/components/widget/productRowCard";
import type { shoppingCartPropsType } from "./type";
import Btn from "@/components/generic/btn";
import LoadingProductRowCard from "@/components/loading/productRowCard";
import { useQuery } from "@tanstack/react-query";
import { checkoutService } from "@/services/cart";

export default function ShopCartShoppingCart({
  items,
  isLoading = false,
}: shoppingCartPropsType) {
  
  return (
    <div className="p-2 grow">
      <Card color="transparent" hasBorder>
        <HeaderSection size="h4" className="mb-sm-section" shape>
          Shopping Cart
        </HeaderSection>
        <div>
          {isLoading ? (
            <>
              {[0, 1, 2 , 3].map((item, index) => (
                <LoadingProductRowCard key={index} className="mb-3 last:mb-0" />
              ))}
            </>
          ) : (
            <>
              {!!items &&
                items.map((item, index) => (
                  <WidgetProductRowCard
                    className="mb-3 last:mb-0"
                    item={item}
                    key={index}
                    queryKeys={["cart", "layout_data"]}
                  />
                ))}
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
