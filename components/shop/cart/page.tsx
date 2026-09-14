import ShopCartPayment from "./payment";
import ShopCartShoppingCart from "./shoppingCart";

export default function ShopCartPage() {
  return (
    <div className="container my-section">
      <div className="flex items-start max-lg:flex-wrap -m-2">
        <ShopCartShoppingCart/>
        <ShopCartPayment/>
      </div>
    </div>
  );
}
