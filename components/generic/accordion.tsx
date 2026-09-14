"use client";

import { useState } from "react";
import Card from "./card";
import Heading from "./heading";
import clsx from "clsx";
import Text from "./text";
import type { AccordionPropsType } from "./types";

export default function Accordion({className,paragraph,title}:AccordionPropsType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card as="li" hasBorder color="transparent" className={clsx(className,"!p-0 overflow-hidden")}>
      <Heading
        onClick={() => setIsOpen(!isOpen)}
        variant="h6"
        color={isOpen ? "primary" : "black"}
        className={clsx(
          { "pb-4 bg-primary-light": isOpen },
          "flex items-center justify-between cursor-pointer transition-all p-4",
        )}
      >
        {
            title
        }
        <div className={clsx("w-7 h-7 rounded-lg bg-neutral-lighter transition-all shrink-0 flex items-center justify-center ms-3",{"!bg-primary text-white":isOpen})}>
            <i className={clsx("icon-down text-xxs leading-none transition-all",{"rotate-180":isOpen})}></i>
        </div>
      </Heading>
      {isOpen && (
        <Text color="dim-dark" className="p-4">
          {paragraph}
        </Text>
      )}
    </Card>
  );
}
