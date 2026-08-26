"use client";

import clsx from "clsx";
import { useState } from "react";
import { TabsPropsType } from "./types";

export default function Tabs<T extends { id: string }>({
  tabs = [],
  renderCell,
  changeTab,
  wrapclass,
  className,
}: TabsPropsType<T>) {
  const [activeItem, setActiveItem] = useState(tabs[0].id);

  const onChangeTab = (id: string) => {
    setActiveItem(id);
    changeTab(id);
  };

  return (
    <ul className={wrapclass}>
      {tabs.length &&
        tabs.map((item, index) => (
          <li
            onClick={() => onChangeTab(item.id)}
            key={index}
            className={clsx(
              className,
              { active: item.id === activeItem },
              "group cursor-pointer transition-all",
            )}
          >
            {renderCell(item)}
          </li>
        ))}
    </ul>
  );
}
