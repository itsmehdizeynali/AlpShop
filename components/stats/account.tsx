import Link from "next/link";
import Btn from "../generic/btn";
import Card from "../generic/card";
import Heading from "../generic/heading";
import Text from "../generic/text";
import clsx from "clsx";
import type { AccountStatPropsType } from "./type";

export default function StatAcount({title,value,icon,link,linkText}:AccountStatPropsType) {
  return (
    <Card color="transparent" hasBorder className="flex items-start h-full hover:border-primary-light">
      <div className="lg:w-10 w-8 lg:h-10 h-8 lg:me-4 me-2.5 rounded-full text-primary bg-primary-light transition-all flex items-center justify-center">
        <i className={clsx(icon,"lg:text-md text-sm")}></i>
      </div>
      <div>
        <Text className="mb-2">{title}</Text>
        <Heading variant="h2" className="mb-3">
          {value}
        </Heading>
        <Btn
          variant="text"
          icon="icon-right-arrow"
          iconPlace="end"
          size="xs"
          as={Link}
          href={link}
        >
          {linkText}
        </Btn>
      </div>
    </Card>
  );
}
