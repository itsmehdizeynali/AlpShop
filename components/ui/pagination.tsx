import { useState } from "react";
import Pagination from "../generic/pagination";

export default function UiPagination() {
  const [current,setCurrent]=useState(1)
  return (
    <div className="container pb-8 last:pb-0">
      <Pagination current={current} total={5} />
    </div>
  );
}
