import { useState } from "react";
import Pagination from "../generic/pagination";

export default function UiPagination() {
  const [current,setCurrent]=useState(1)
  const refreshData=(num:number)=>{
    setCurrent(num)
  }
  return (
    <div className="container pb-8 last:pb-0">
      <Pagination current={current} total={5} reFetch={refreshData} />
    </div>
  );
}
