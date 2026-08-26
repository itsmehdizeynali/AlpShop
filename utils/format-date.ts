import { format } from "date-fns";

const getFormatDate=(date:string)=>{
    return format(new Date(date), "HH:mm")
}
export const getFormatDateSecondary=(date:string)=>{
    return format(new Date(date), "MM/dd/yyy: HH:mm")
}

export default getFormatDate