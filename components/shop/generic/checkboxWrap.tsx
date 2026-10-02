import Checkbox from "@/components/generic/checkbox";
import type { CategoryItemType } from "@/components/genericTypes";

export default function ShopCheckboxWrap({
  item,
  selectedList,
  handleCheck,
  ...props
}: {
  item: CategoryItemType;
  selectedList: string[];
  handleCheck: ({
    type,
    slug,
  }: {
    type: "add" | "remove";
    slug: string;
  }) => void;
}) {
  return (
    <div className="mb-3 last:mb-0" {...props}>
      <Checkbox
        checked={selectedList?.includes(item.slug)}
        changeSelectedList={handleCheck}
        name={item?.name}
        slug={item?.slug}
      />
      {!!item?.children && (
        <div className="ps-4 mt-3">
          {item?.children.map(
            (childItem: CategoryItemType, childIndex: number) => (
              <Checkbox
                checked={selectedList?.includes(childItem.slug)}
                changeSelectedList={handleCheck}
                key={childIndex}
                name={childItem?.name}
                slug={childItem?.slug}
                className="mb-2 last:mb-0"
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}
